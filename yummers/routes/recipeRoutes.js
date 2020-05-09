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
router.post('/addRecipe', uploadRecipe.single('foodPicture'), recipeFormsValidation, recipeController.addRecipe);

//session user like recipe(likeId)
router.post('/like/:likeId', recipeController.likeRecipe);

//session user unlike recipe(unlikeId)
router.post('/unlike/:likeId', recipeController.unlikeRecipe);
