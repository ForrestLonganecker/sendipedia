const Collaborator = require('./models').Collaborator;
const User = require('./models').User;
const Wiki = require('./models').Wiki;
const Authorizer = require('../policies/collaborator');

module.exports = {
  createCollaborator(req, callback){
    let activeWiki;
    let wikiId;
    let userId;

    Wiki.findOne({where: {title: req.body.wikiTitle}})
    .then((wiki) => {
      activeWiki = wiki;
      wikiId = wiki.id;
      
      User.findOne({where: {name: req.body.userName}})
      .then((user) => {
        userId = user.id
        
        Collaborator.findOne({
          where: {
            wikiId: wikiId, 
            userId: userId
          }
        })
        .then((collaborator) => {
          if(collaborator){
            callback('Collaboration already exists');
          } else {
            const authorized = new Authorizer(req.user, activeWiki).create();

            if(authorized){
              return Collaborator.create({
                wikiId: wikiId,
                userId: userId
              })
              .then((collaborator) => {
                callback(null, collaborator);
              })
              .catch((err) => {
                callback(err);
              });
            } else {
              req.flash('notice', `Must be Premium user and own wiki to do that.`);
              callback(401);
            }
          }
        });
      });
    });
  },
  deleteCollaborator(req, callback){
    let wikiId;
    let userId;

    Wiki.findOne({where: {title: req.body.wikiTitle}})
    .then((wiki) => {
      wikiId = wiki.id;

      User.findOne({where: {name: req.body.userName}})
      .then((user) => {
        userId = user.id;

        return Collaborator.findOne(
          {where: {
            wikiId: wikiId,
            userId: userId
          }
        })
        .then((collaborator) => {
          if(!collaborator){
            return callback('Collaborator not found');
          }
    
          // const authorized = new Authorizer(req.user, collaborator).destroy();
          // if(authorized){
            Collaborator.destroy({ 
              where: {
                wikiId: wikiId,
                userId: userId
              }
            })
            .then((deletedRecordsCount) => {
              callback(null, deletedRecordsCount);
            })
            .catch((err) => {
              callback(err);
            });
          // } else {
          //   req.flash('notice', 'you are not authorized to do that.')
          //   callback(401);
          // }
        })
        .catch((err) => {
          callback(err);
        });
      });
    });

  },
}