const router = require('express').Router();
module.exports = router;

const mongoose = require('mongoose');

const recipeController = require('../controller/recipeController');
const commentsController = require('../controller/commentController');

router.get('/:recipeId', recipeController.getRecipePage);

//load edit recipe page
router.get('/:recipeId/edit', recipeController.editRecipePage);

//update recipe
router.post('/:recipeId/editRecipe', recipeController.updateRecipe);

//delete recipe
router.post('/:recipeId/delete', recipeController.deleteRecipe);

//add comment
router.post('/:recipeId/addComment', commentsController.addComment);