const router = require('express').Router();
module.exports = router;

const mongoose = require('mongoose');

const userController = require('../controller/userController');
const cookbookController = require('../controller/cookbookController');

const {loginValidation, registerValidation, editProfileValidation} = require('../validators');

router.get('/:userId', userController.getProfile);

//load edit user page
router.get('/:userId/edit', userController.editProfilePage);

//load create recipe page
router.get('/:userId/add', userController.createRecipe);

//load user recipes
router.get('/:userId/recipes', userController.getUserRecipes);

//load user's cookbook
router.get('/:userId/cookbook', cookbookController.getCookbook);

//update user
router.post('/:userId/editUser', editProfileValidation, userController.updateUser);