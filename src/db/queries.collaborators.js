const Collaborator = require('./models').Collaborator;
const Authorizer = require('../policies/collaborator');

module.exports = {
  createCollaborator(req, callback){
    const authorized = new Authorizer(req.user, collaborator).create();

    if(authorized){
      return Collaborator.create({
        wikiId: req.params.wikiId,
        userId: req.body.userId
      })
      .then((collaborator) => {
        callback(null, collaborator);
      })
      .catch((err) => {
        callback(err);
      });
    } else {
      req.flash('notice', 'You must be a premium user to do that.');
      callback(401);
    }
  },
  deleteCollaborator(req, callback){
    return Collaborator.findOne(
      {where: {
        wikiId: req.params.wikiId,
        userId: req.body.userId
      }
    })
    .then((collaborator) => {
      if(!collaborator){
        return callback('Collaborator not found');
      }

      const authorized = new Authorizer(req.user, collaborator).destroy();
      if(authorized){
        Collaborator.destroy({ 
          where: {
            wikiId: req.params.wikiId,
            userId: req.body.userId
          }
        })
        .then((deletedRecordsCount) => {
          callback(null, deletedRecordsCount);
        })
        .catch((err) => {
          callback(err);
        });
      } else {
        req.flash('notice', 'you are not authorized to do that.')
        callback(401);
      }
    })
    .catch((err) => {
      callback(err);
    });
  },
}