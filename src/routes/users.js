const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validation = require('./validation');

router.get("/users/signup", userController.signup);
router.get("/users/signout", userController.signOut);
router.get("/users/signin", userController.signInForm);
router.post("/users/signin", validation.validateUserSignin, userController.signIn);
router.post("/users", validation.validateUsers, userController.create);

router.get('/users/:id', userController.show);
router.get('/users/:id/upgrade', userController.upgradeForm);
router.get('/users/:id/stripe', userController.stripeForm);
router.post('/users/promote', userController.promoteUser);
router.post('/users/demote', userController.demoteUser);

module.exports = router;
