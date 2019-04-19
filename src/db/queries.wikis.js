const Wiki = require('./models').Wiki;

module.exports = {
  getAllWikis(callback){
    return Wiki.findAll()
    .then((wikis) => {
      callback(null, wikis);
    })
    .catch((err) => {
      callback(err);
    })
  },
}