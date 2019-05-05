const collaboratorQueries = require('../db/queries.collaborators.js');
// const Authorizer = require('../policies/collaborator');

module.exports = {
  create(req, res, next){
    if(req.user){
      console.log('{CONTROLLER 1} REQ.USER: ', req.user);
      collaboratorQueries.createCollaborator(req, (err, collaborator) => {
        if(err){
          console.log('{CONTROLLER 2} IF/ERR: ', err);
          req.flash('error', err);
        }
      });
    } else {
      req.flash('notice', 'You must be a premium user to do that.');
    }
    console.log('{CONTROLLER 3} Success, now redirecting')
    req.flash('notice', 'You have successfully added a collaborator!');
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