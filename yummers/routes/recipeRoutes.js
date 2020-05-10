const router = require('express').Router();
module.exports = router;

const mongoose = require('mongoose');

//Validators
const {loginValidation, registerValidation, editProfileValidation, recipeFormsValidation} = require('../validators');

//user authentication
const auth = require('../authentication');

//Objects controller
const recipeController = require('../controller/recipeController');
const commentsController = require('../controller/commentController');

//file upload middleware
const {upload, uploadRecipe} = require('../multer');

router.get('/:recipeId', recipeController.getRecipePage);

//load edit recipe page
router.get('/:recipeId/edit', auth.isPrivate, recipeController.editRecipePage);

//update recipe
router.post('/:recipeId/editRecipe', uploadRecipe.single('foodPicture'), recipeController.updateRecipe);

//delete recipe
router.post('/:recipeId/delete', recipeController.deleteRecipe);

//add comment
router.post('/:recipeId/addComment', commentsController.addComment);

//create recipe
<<<<<<< HEAD
router.post('/addRecipe', uploadRecipe.single('foodPicture'), recipeFormsValidation, recipeController.addRecipe);

//session user like recipe
router.post('/like/', recipeController.likeRecipe);

//session user unlike recipe
router.post('/unlike/', recipeController.unlikeRecipe);
=======
router.post('/addRecipe', uploadRecipe.single('foodPicture'), recipeFormsValidation, recipeController.addRecipe);
>>>>>>> parent of aed1abe... Like and cooked
