const Collaborator = require('./models').Collaborator;
const Authorizer = require('../policies/collaborator');
const markdown = require('markdown').markdown;

module.exports = {
  getAllCollaborators(wikiId, callback){
    return Collaborator.findAll({where: {wikiId: wikiId}})
    .then((wikis) => {
      callback
    })
  }
}