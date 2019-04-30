const passport = require("passport");
const userQueries = require("../db/queries.users.js");
const emails = require("../assets/sendgrid/emails.js");

const stripe = require('stripe')(process.env.stripeSecretKey);

module.exports = {
  signup(req, res, next) {
    res.render("users/signup");
  },
  create(req, res, next) {
    let newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation
    };
    userQueries.createUser(newUser, (err, user) => {
      if (err) {
        req.flash("error", err);
        res.redirect("/users/signup");
      } else {
        passport.authenticate("local")(req, res, () => {
          req.flash("notice", "You've successfully signed in!");
          res.redirect("/");
          // sendgrid confirmation email
          emails.newUserEmail(newUser);
        });
      }
    });
  },
  signInForm(req, res, next){
    res.render('users/signin');
  },
  signIn(req, res, next){
    passport.authenticate('local')(req, res, () => {
      if(!req.user){
        req.flash('notice', 'Sign in failed. Please try again.');
        res.redirect('/users/signin');
      } else {
        req.flash('notice', "You've successfully signed in!");
        res.redirect('/');
      }
    })
  },
  signOut(req, res, next){
    req.logout();
    req.flash('notice', "You've successfully signed out!");
    res.redirect('/');
  },
  show(req, res, next){
    userQueries.getUser(req.params.id, (err, result) => {
      if(err || result.user === undefined){
        req.flash('notice', 'No user found with that ID.');
        res.redirect('/');
      } else {
        res.render('users/index', {result});
      }
    });
  },
  upgradeForm(req, res, next){
    res.render('users/upgrade');
  },
  stripeForm(req, res, next){
    res.render('users/stripe')
  },
  promoteUser(req, res, next){
    //keeping this around for admin use
    
    if(req.user.role === 'standard'){
      userQueries.promoteUser(req, (err, user) => {
        if(err){
          req.flash('error', err);
          res.redirect('users/upgrade');
        } else {
          req.flash('notice', "You've successfully upgraded your account to premium!");
          res.redirect(`/users/${req.user.id}`);
        }
      });
    } else {
      req.flash('notice', 'You are not a standard memeber so cannot be upgraded to premium');
      res.redirect('/');
    }
  },
  demoteUser(req, res, next){
    if(req.user.role === 'premium'){
      userQueries.demoteUser(req, (err, user) => {
        if(err){
          req.flash('error', err);
          res.redirect('users/upgrade');
        } else {
          req.flash('notice', "You've successfully downgraded your account to standard");
          res.redirect(`/users/${req.user.id}`);
        }
      });
    } else {
      req.flash('notice', 'You are not a premium memeber so cannot be downgraded to standard');
      res.redirect(`/`);
    }
  },
  chargeUser(req, res, next){

    stripe.customers.create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    })
    .then((customer) => {
      stripe.charges.create({
        amount: 1500,
        currency: 'usd',
        customer: customer.id,
        description:'Premium membership upgrade'
      });
    })
    .then((charge) => {
      userQueries.promoteUser(req, (err, user) => {
        if(err){
          req.flash('error', err);
          res.redirect('users/upgrade');
        } else {
          req.flash('notice', "You've successfully upgraded your account to premium!");
          res.redirect(`/users/${req.user.id}`);
        }
      });
    }) 
  },
};
