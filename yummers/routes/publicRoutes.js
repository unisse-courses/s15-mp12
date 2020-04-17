const router = require('express').Router();
module.exports = router;
const mongoose = require('mongoose');
const {loginValidation, registerValidation} = require('../validators.js');

const userController = require('../controller/userController');
const recipeController = require('../controller/recipeController');

router.get('/', recipeController.getAllRecipes);

//userForms
router.get('/form/:type', userController.userForm);

//logout
router.get('/logout', userController.logoutUser);

//login
router.post('/login', loginValidation, userController.userLogin);

//signup
router.post('/signup', registerValidation, userController.addUser);

//create recipe
router.post('/addRecipe', recipeController.addRecipe);
