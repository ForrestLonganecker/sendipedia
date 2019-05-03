const express = require('express');
const router = express.Router();

const collaboratorController = require('../controllers/collaboratorController');

router.post('/wikis/:wikiId/collaborator/create', collaboratorController.create);
router.post('/wikis/:wikiId/collaborator/:id/destroy', collaboratorController.destroy);