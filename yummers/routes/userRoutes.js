const router = require('express').Router();
module.exports = router;

const mongoose = require('mongoose');

const userController = require('../controller/userController');
const recipeController = require('../controller/recipeController');
const cookbookController = require('../controller/cookbookController');

router.get('/:userId', userController.getProfile);

router.get('/:userId/add', userController.createRecipe);

router.get('/:userId/recipes', userController.getUserRecipes);

router.get('/:userId/cookbook', userController.getCookbook);