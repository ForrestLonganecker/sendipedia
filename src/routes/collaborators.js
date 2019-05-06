const express = require('express');
const router = express.Router();

// add ensure auth helper

const collaboratorController = require('../controllers/collaboratorController');

router.get('/collaborators/edit', collaboratorController.edit);

router.post('/collaborators/create', collaboratorController.create);
router.post('/collaborators/destroy', collaboratorController.destroy);

module.exports = router;