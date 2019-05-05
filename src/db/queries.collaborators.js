const Collaborator = require('./models').Collaborator;
const User = require('./models').User;
const Wiki = require('./models').Wiki;
const Authorizer = require('../policies/collaborator');

module.exports = {
  createCollaborator(req, callback){
    console.log('{QUERY 1} REQ.BODY: ', req.body.userName, req.body.wikiTitle);
    // const authorized = new Authorizer(req.user, collaborator).create();
    // console.log('{QUERY 2} AUTHORIZED: ', authorized);
    let wikiId;
    let userId;
    // if(authorized){
      Wiki.findOne({where: {title: req.body.wikiTitle}})
      .then((wiki) => {
        console.log('{QUERY 3} WIKI: ', wiki);
        wikiId = wiki.id;
        
        User.findOne({where: {name: req.body.userName}})
        .then((user) => {
          console.log('{QUERY 4} USER: ', user);
          userId = user.id
          
          return Collaborator.create({
            wikiId: wikiId,
            userId: userId
          })
          .then((collaborator) => {
            console.log('{QUERY 5} SUCCESS: ', collaborator);
            callback(null, collaborator);
          })
          .catch((err) => {
            console.log('{QUERY 6} FAILIURE: ', err);
            callback(err);
          });
        });
      });
    // } else {
    //   req.flash('notice', 'You must be a premium user to do that.');
    //   callback(401);
    // }
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
    
          const authorized = new Authorizer(req.user, collaborator).destroy();
          if(authorized){
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
          } else {
            req.flash('notice', 'you are not authorized to do that.')
            callback(401);
          }
        })
        .catch((err) => {
          callback(err);
        });
      });
    });

  },
}