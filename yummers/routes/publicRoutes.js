const router = require('express').Router();
module.exports = router;
const mongoose = require('mongoose');

const userController = require('../controller/userController');
const recipeController = require('../controller/recipeController');

router.get('/', recipeController.getAllRecipes);

//userForms
router.get('/form/:type', userController.userForm);

//login
router.post('/login', userController.userLogin);


//signup
router.post('/signup', userController.addUser);
