const router = require('express').Router();
module.exports = router;

const mongoose = require('mongoose');

const userController = require('../controller/userController');
const recipeController = require('../controller/recipeController');

router.get('/:recipeId', recipeController.getRecipePage);

//load edit recipe page
router.get('/:recipeId/edit', recipeController.editRecipePage);

//update recipe
router.post('/:recipeId/editRecipe', recipeController.updateRecipe);

//delete recipe
router.post('/:recipeId/delete', recipeController.deleteRecipe);

//add comment
router.post('/:recipeId/addComment', commentsController.addComment);

//create recipe
router.post('/addRecipe', uploadRecipe.single('foodPicture'), recipeFormsValidation, recipeController.addRecipe);

//session user like recipe(likeId)
router.post('/like/:likeId', recipeController.likeRecipe);

//session user unlike recipe
router.post('/unlike/', recipeController.unlikeRecipe);

router.post('/:recipeId/delete', recipeController.deleteRecipe);
