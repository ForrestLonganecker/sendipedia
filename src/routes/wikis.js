const express = require('express');
const router = express.Router();
const helper = require('../auth/helpers');

const wikiController = require('../controllers/wikiController');

router.get('/wikis', wikiController.index);
router.get('/wikis/new', wikiController.new);
router.get('/wikis/:id', wikiController.show);
router.get('/wikis/:id/edit', wikiController.edit);

router.post('/wikis/create', helper.ensureAuthenticated, wikiController.create);
router.post('/wikis/createPrivate', helper.ensureAuthenticated, wikiController.createPrivate);
router.post('/wikis/:id/destroy', helper.ensureAuthenticated, wikiController.destroy);
router.post('/wikis/:id/update', helper.ensureAuthenticated, wikiController.update);
router.post('/wikis/:id/makePrivate', helper.ensureAuthenticated, wikiController.makePrivate);
router.post('/wikis/:id/makePublic', helper.ensureAuthenticated, wikiController.makePublic);

module.exports = router;