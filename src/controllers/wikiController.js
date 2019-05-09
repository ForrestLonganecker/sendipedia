const wikiQueries = require('../db/queries.wikis.js');
const Authorizer = require('../policies/wiki');
const markdown = require("markdown").markdown;

module.exports = {
  index(req, res, next){
    if(req.user){
      wikiQueries.getAllWikis(req, (err, result) => {
        if(err){
          res.redirect(500, 'static/index');
        } else {
          res.render('wikis/index', {result});
        }
      })
    } else {
      wikiQueries.getAllPublicWikis(req, (err, result) => {
        if(err){
          res.redirect(500, 'static/index');
        } else {
          res.render('wikis/index', {result});
        }
      })
    }
  },
  new(req, res, next){
    const authorized = new Authorizer(req.user).new();

    if(authorized){
      res.render('wikis/new');
    } else {
      req.flash('notice', 'You are not authorized to do that.')
      res.redirect('/wikis');
    }
  },
  create(req, res, next){
    const authorized = new Authorizer(req.user).create();

    if(authorized){
      let newWiki = {
        title: req.body.title,
        body: markdown.toHTML(req.body.body),
        // currently hard-coding false, switch out for upgraded users
        private: false,
        userId: req.user.id
      };
      wikiQueries.addWiki(newWiki, (err, wiki) => {
        if(err){
          res.redirect(500, 'wikis/new');
        } else {
          res.redirect(303, `/wikis/${wiki.id}`);
        }
      });
    } else {
      req.flash('notice', 'You are not authorized to do that.');
      res.redirect('/wikis');
    }
  },
  createPrivate(req, res, next){
    const authorized = new Authorizer(req.user).create();

    if(authorized){
      let newWiki = {
        title: req.body.title,
        body: markdown.toHTML(req.body.body),
        private: req.body.private,
        userId: req.user.id
      };
      wikiQueries.addWiki(newWiki, (err, wiki) => {
        if(err){
          res.redirect(500, 'wikis/new');
        } else {
          res.redirect(303, `/wikis/${wiki.id}`);
        }
      });
    } else {
      req.flash('notice', 'You are not authorized to do that.');
      res.redirect('/wikis');
    }
  },
  show(req, res, next){
    if(req.user){
      wikiQueries.getWiki(req, (err, result) => {
        if(err || result.wiki == undefined){
          res.redirect(404, '/wikis');
        } else {
          const authorized = new Authorizer(req.user, result.wiki).show();
          
          if(authorized){
            res.render('wikis/show', {result});
          } else {
            req.flash('notice', 'You are not authorized to do that');
            res.redirect('/wikis')
          }
        }
      });
    } else {
      wikiQueries.getPublicWiki(req, (err, result) => {
        if(err || result.wiki == undefined || result.wiki.private){
          res.redirect(404, '/wikis');
        } else {
          res.render('wikis/show', {result});
        }
      });
    }
  },
  destroy(req, res, next){
    wikiQueries.deleteWiki(req, (err, wiki) => {
      if(err){
        res.redirect(err, `/wikis/${req.params.id}`);
      } else {
        res.redirect(303, '/wikis');
      }
    });
  },
  edit(req, res, next){
    //need to do the same that show does with spliting req.user/else

    if(req.user){
      wikiQueries.getWiki(req, (err, result) => {
        if(err || result.wiki == undefined){
          res.redirect(404, `/wikis/${req.params.id}`);
        } else {
          const authorized = new Authorizer(req.user, result.wiki).edit();
  
          if(authorized){
              res.render('wikis/edit', {result});
          } else {
            req.flash('notice', 'You are not authorized to do that.');
            res.redirect(`/wikis/${req.params.id}`);
          }
        }
      });
    } else {
      wikiQueries.getPublicWiki(req, (err, result) => {
        if(err, result.wiki == undefined || result.wiki.private){
          res.redirect(404, '/wikis');
        } else {
          res.render('wikis/show', {result});
        }
      })

    }

  },
  update(req, res, next){
    wikiQueries.updateWiki(req, req.body, (err, wiki) => {
      if(err || wiki == null){
        res.redirect(404, `/wikis/${req.params.id}/edit`);
      } else {
        res.redirect(`/wikis/${req.params.id}`);
      }
    });
  },
  makePrivate(req, res, next){
    wikiQueries.makeWikiPrivate(req, (err, wiki) => {
      if(err || wiki == null){
        res.redirect(404, `/wikis/${req.params.id}`);
      } else {
        res.redirect(`/wikis/${req.params.id}`);
      }
    });
  },
  makePublic(req, res, next){
    wikiQueries.makeWikiPublic(req, (err, wiki) => {
      if(err || wiki == null){
        res.redirect(404, `/wikis/${req.params.id}`);
      } else {
        res.redirect(`/wikis/${req.params.id}`);
      }
    });
  },
}