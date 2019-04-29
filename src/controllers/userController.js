const passport = require("passport");
const userQueries = require("../db/queries.users.js");
const emails = require("../assets/sendgrid/emails.js");

const stripe = require('stripe')(process.env.stripeTestAPI);

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
  upgradeForm(req, res, next){
    res.render('users/upgrade');
  },
  chargeUser(req, res, next){ 
    (async () => {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          name: 'Premium account',
          description: 'upgraded user from standard to premium account',
          amount: 1500,
          currency: 'usd',
          quantity: 1
        }],
        success_url: '/',
        cancel_url: '/',
      });
    }) ();

  },
  promoteUser(req, res, next){
    //insert stripe logic here

    if(req.user.role === 'standard'){
      userQueries.promoteUser(req, (err, user) => {
        if(err){
          req.flash('error', err);
          res.redirect('users/upgrade');
        } else {
          req.flash('notice', "You've successfully upgraded your account to premium!");
          res.redirect('/');
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
          res.redirect('/');
        }
      });
    } else {
      req.flash('notice', 'You are not a premium memeber so cannot be downgraded to standard');
      res.redirect('/');
    }
  },
};
