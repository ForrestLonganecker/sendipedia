const express = require('express');
const router = express.Router();

const wikiController = require('../controllers/wikiController');

router.get('/wikis', wikiController.index);
router.get('/wikis/new', wikiController.new);
router.get('/wikis/:id', wikiController.show);
router.post('/wikis/create', wikiController.create);
router.post('/wikis/:id/destroy', wikiController.destroy);

module.exports = router;