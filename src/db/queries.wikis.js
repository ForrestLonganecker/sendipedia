const Wiki = require('./models').Wiki;
const Collaborator = require('./models').Collaborator;
const Authorizer = require('../policies/wiki');
const markdown = require('markdown').markdown;

module.exports = {
  getAllWikis(req, callback){
    let result = {};
    Wiki.findAll({where: {private: false}})
    .then((publicWikis) => {
      result["publicWikis"] = publicWikis;
      
      Wiki.scope({method: ["allOwnedPrivate", req.user.id]}).findAll()
      .then((ownedPrivateWikis) => {
        result["privateWikis"] = ownedPrivateWikis;
        
        Collaborator.scope({method: ['allCollabWikis', req.user.id]}).findAll()
        .then((collaborativeWikis) => {
          result["collabWikis"] = collaborativeWikis;
          // can insert more associations here
          callback(null, result);
        })
        .catch((err) => {
          callback(err);
        });
      });
    });
  },
  getAllPublicWikis(req, callback){
    let result = {};
    return Wiki.findAll({where: {private: false}})
    .then((publicWikis) => {
      result["publicWikis"] = publicWikis
      callback(null, result);
    })
    .catch((err) => {
      callback(err);
    })
  },
  // getPublicWiki(req, callback){
  //   let result = {};
  //   Wiki.findByPk(req.params.id)
  //   .then((wiki) => {
  //     if(!wiki){
  //       callback(404);
  //     } else {
  //       result["wiki"] = wiki;
  //       callback(null, result);
  //     }
  //   })
  //   .catch((err) => {
  //     callback(err);
  //   })
  // },
  getWiki(req, callback){
    let result = {};
    Wiki.findByPk(req.params.id, {
      include: [
        {model: Collaborator, as: 'collaborators'}
      ]}
    )
    .then((wiki) => {
    if(!wiki){
      callback(404);
    } else {
      result["wiki"] = wiki;
      
      Collaborator.scope({method: ['allCollabUsers', (wiki.id)]}).findAll()
      .then((collaboratorUsers) => {
        result["collabUsers"] = collaboratorUsers;
        callback(null, result);
      })
      .catch((err) => {
        callback(err);
      });
    }
  })
  .catch((err) => {
      callback(err);
    })
  },
  addWiki(newWiki, callback){
    return Wiki.create({
      title: newWiki.title,
      body: newWiki.body,
      private: newWiki.private,
      userId: newWiki.userId
    })
    .then((wiki) => {
      callback(null, wiki);
    })
    .catch((err) => {
      callback(err);
    })
  },
  deleteWiki(req, callback){
    return Wiki.findByPk(req.params.id)
    .then((wiki) => {
      const authorized = new Authorizer(req.user, wiki).destroy();

      if(authorized){
        wiki.destroy()
        .then((res) => {
          callback(null, wiki);
        });
      } else {
        req.flash('notice', 'You are not authorized to do that.');
        callback(401);
      }
    })
    .catch((err) => {
      callback(err);
    });
  },
  updateWiki(req, updatedWiki, callback){
    return Wiki.findByPk(req.params.id, {
      include: [
        {model: Collaborator, as: 'collaborators'}
      ]
    })
    .then((wiki) => {
      if(!wiki){
        console.log('{QUERY 1} !WIKI: ', wiki);
        return callback('Wiki not found');
      }

      const authorized = new Authorizer(req.user, wiki).update();

      console.log('{QUERY 2} AUTHORIZED: ', authorized);
      if(authorized){
        wiki.update({
          title: updatedWiki.title, 
          body: markdown.toHTML(updatedWiki.body)
        },
          {where: {id: req.params.id}}
        )
        .then(() => {
          console.log('{QUERY 3} SUCCESS: ', wiki);
          callback(null, wiki);
        })
        .catch((err) => {
          console.log('{QUERY 4} CATCH ERR: ', err);
          callback(err);
        });
      } else {
        console.log('{QUERY 5} NOT AUTHORIZED');
        req.flash('notice', 'You are not authorized to do that.');
        callback('Forbidden');
      }
    });
  },
  makeWikiPrivate(req, callback){
    return Wiki.findByPk(req.params.id)
    .then((wiki) => {
      if(!wiki){
        return callback('Wiki not found');
      }

      const authorized = new Authorizer(req.user, wiki).update();

      if(authorized){
        wiki.update( 
          {private: true},
          {where: {id: wiki.id}}
        )
        .then(() => {
          callback(null, wiki);
        })
        .catch((err) => {
          callback(err);
        });
      } else {
        req.flash('notice', 'You are not authorized to do that.');
        callback('Forbidden');
      }
    });
  },
  makeWikiPublic(req, callback){
    return Wiki.findByPk(req.params.id)
    .then((wiki) => {
      if(!wiki){
        return callback('Wiki not found');
      }

      const authorized = new Authorizer(req.user, wiki).update();

      if(authorized){
        wiki.update( 
          {private: false},
          {where: {id: wiki.id}}
        )
        .then(() => {
          callback(null, wiki);
        })
        .catch((err) => {
          callback(err);
        });
      } else {
        req.flash('notice', 'You are not authorized to do that.');
        callback('Forbidden');
      }
    });
  },
  demoteWikis(req){
    return Wiki.scope({method: ["allOwnedPrivate", req.user.id]}).findAll()
    .then((wikis) => {
      wikis.forEach(wiki => {
        wiki.update(
          {private: false},
          {where: {id: wiki.id}}
        )
        .catch((err) => {
          // console.log(err);
          done();
        });
      });
    });
  },
}