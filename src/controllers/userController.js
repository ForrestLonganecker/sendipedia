const passport = require("passport");
const userQueries = require("../db/queries.users.js");
const emails = require("../assets/sendgrid/emails.js");

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
};
