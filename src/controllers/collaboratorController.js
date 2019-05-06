const collaboratorQueries = require('../db/queries.collaborators.js');
// const Authorizer = require('../policies/collaborator');

module.exports = {
  edit(req, res, next){
    if(req.user.role == 'premium' || req.user.role == 'admin'){
      res.render('collaborators/edit');
    } else {
      req.flash('notice', 'You must be a Premium user to do that');
      res.redirect(req.headers.referer);
    }
  },
  create(req, res, next){
    // add logic to locate preexisting or if there is even a wiki/user
    if(req.user){
      collaboratorQueries.createCollaborator(req, (err, collaborator) => {
        if(err){
          req.flash('error', err);
        }
      });
    } else {
      req.flash('notice', 'You must be a premium user to do that.');
    }
    req.flash('notice', `You have successfully added ${req.body.userName} to ${req.body.wikiTitle}!`);
    res.redirect(req.headers.referer);
  },
  destroy(req, res, next){
    if(req.user){
      collaboratorQueries.deleteCollaborator(req, (err, collaborator) => {
        if(err){
          req.flash('error', err);
        }
          req.flash('notice', `You have removed ${req.body.userName} from ${req.body.wikiTitle}.`);
          res.redirect(req.headers.referer);
        });
      } else {
        req.flash('notice', 'You must be a premium member to do that');
        res.redirect(req.headers.referer);
      }
  },
}