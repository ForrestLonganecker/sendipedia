module.exports = {
  validateUsers(req, res, next) {
    if(req.method === 'POST') {
      req.checkBody('name', 'must be at least 2 characters in length').isLength({min: 2});
      req.checkBody('email', 'must be valid').isEmail();
      req.checkBody('password', 'must be at least 6 characters in length').isLength({min: 6});
      req.checkBody('passwordConfirmation', 'must match the password provided').optional().matches(req.body.password);
    }
    const errors = req.validationErrors();
    if(errors) {
      req.flash('error', errors);
      return res.redirect(req.headers.referer);
    } else {
      return next();
    }
  },
  validateUserSignin(req, res, next) {
    if(req.method === 'POST') {
      req.checkBody('email', 'must be valid').isEmail();
      req.checkBody('password', 'must be at least 6 characters in length').isLength({min: 6});
      req.checkBody('passwordConfirmation', 'must match the password provided').optional().matches(req.body.password);
    }
    const errors = req.validationErrors();
    if(errors) {
      req.flash('error', errors);
      return res.redirect(req.headers.referer);
    } else {
      return next();
    }
  },
  validateWiki(req, res, next) {
    if(req.method === 'POST') {
      req.checkBody('title', 'must be at least 5 characters').isLength({min: 5});
      req.checkBody('body', 'must be at least 10 characters in length').isLength({min: 10});
      req.checkBody('private', 'must be a boolean').isBoolean();
      req.checkBody('userId', 'must have assigned userId').isInt();
    }
    const errors = req.validationErrors();
    if(errors) {
      req.flash('error', errors);
      return res.redirect(req.headers.referer);
    } else {
      return next();
    }
  }
}