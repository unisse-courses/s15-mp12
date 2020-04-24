const router = require('express').Router();
module.exports = router;

//database
const mongoose = require('mongoose');

//controllers
const userController = require('../controller/userController');
const cookbookController = require('../controller/cookbookController');

//validator middlewares
const {loginValidation, registerValidation, editProfileValidation} = require('../validators');

//file upload middleware
const {upload} = require('../multer');

//user authentication
const auth = require('../authentication');

router.get('/:userId', userController.getProfile);

//load edit user page
router.get('/:userId/edit', auth.isPrivate, userController.editProfilePage);

//load create recipe page
router.get('/:userId/add', auth.isPrivate, userController.createRecipe);

//load user recipes
router.get('/:userId/recipes', auth.isPrivate, userController.getUserRecipes);

//load user's cookbook
router.get('/:userId/cookbook', auth.isPrivate, cookbookController.getCookbook);

//update user
router.post('/:userId/editUser', upload.single('profilePicture'), editProfileValidation, userController.updateUser);
