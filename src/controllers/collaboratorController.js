const collaboratorQueries = require('../db/queries.collaborators.js');
// const Authorizer = require('../policies/collaborator');

module.exports = {
  create(req, res, next){
    if(req.user){
      collaboratorQueries.createCollaborator(req, (err, collaborator) => {
        if(err){
          req.flash('error', err);
        }
      });
    } else {
      req.flash('notice', 'You must be a premium user to do that.');
    }
    res.redirect(req.headers.referer);
  },
  destroy(req, res, next){
    if(req.user){
      collaboratorQueries.deleteCollaborator(req, (err, collaborator) => {
        if(err){
          req.flash('error', err);
        }
        res.redirect(req.headers.referer);
      });
    } else {
      req.flash('notice', 'You must be a premium member to do that');
      res.redirect(req.headers.referer);
    }
  },
}