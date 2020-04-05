const router = require('express').Router();
module.exports = router;

const mongoose = require('mongoose');

const userController = require('../controller/userController');
const recipeController = require('../controller/recipeController');
const cookbookController = require('../controller/cookbookController');

router.get('/:userId', userController.getProfile);

//load edit user page
router.get('/:userId/edit', userController.editProfilePage);

//load create recipe page
router.get('/:userId/add', userController.createRecipe);

//load user recipes
router.get('/:userId/recipes', userController.getUserRecipes);

//load user's cookbook
router.get('/:userId/cookbook', userController.getCookbook);

//update user
router.post('/:userId/editUser', userController.updateUser);