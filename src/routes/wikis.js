const express = require('express');
const router = express.Router();
const helper = require('../auth/helpers');

const wikiController = require('../controllers/wikiController');

router.get('/wikis', wikiController.index);
router.get('/wikis/new', wikiController.new);
router.get('/wikis/:id', wikiController.show);
router.get('/wikis/:id/edit', wikiController.edit);
router.post('/wikis/create', helper.ensureAuthenticated, wikiController.create);
router.post('/wikis/:id/destroy', wikiController.destroy);
router.post('/wikis/:id/update', wikiController.update);

module.exports = router;