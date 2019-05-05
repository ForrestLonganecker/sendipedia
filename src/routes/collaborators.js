const express = require('express');
const router = express.Router();

const collaboratorController = require('../controllers/collaboratorController');

router.post('/users/collaborator/create', collaboratorController.create);
router.post('/users/collaborator/destroy', collaboratorController.destroy);

module.exports = router;