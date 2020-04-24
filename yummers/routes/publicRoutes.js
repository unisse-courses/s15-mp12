const router = require('express').Router();
module.exports = router;
const mongoose = require('mongoose');
const {loginValidation, registerValidation, editProfileValidation, recipeFormsValidation} = require('../validators');

//user authentication
const auth = require('../authentication');

//Objects controller
const userController = require('../controller/userController');
const recipeController = require('../controller/recipeController');

router.get('/', recipeController.getAllRecipes);

//login page
router.get('/login', auth.isPublic, userController.loginPage);

//signup page
router.get('/signup', auth.isPublic, userController.signupPage);

//logout
router.get('/logout', userController.logoutUser);

//login
router.post('/loginUser', loginValidation, userController.userLogin);

//signup
router.post('/signupUser', registerValidation, userController.addUser);

