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
<<<<<<< HEAD
router.post('/:recipeId/delete', recipeController.deleteRecipe);

//add comment
router.post('/:recipeId/addComment', commentsController.addComment);

//create recipe
<<<<<<< HEAD
<<<<<<< HEAD
router.post('/addRecipe', uploadRecipe.single('foodPicture'), recipeFormsValidation, recipeController.addRecipe);

//session user like recipe
router.post('/like/', recipeController.likeRecipe);

//session user unlike recipe
router.post('/unlike/', recipeController.unlikeRecipe);
=======
router.post('/addRecipe', uploadRecipe.single('foodPicture'), recipeFormsValidation, recipeController.addRecipe);
>>>>>>> parent of aed1abe... Like and cooked
=======
router.post('/:recipeId/delete', recipeController.deleteRecipe);
>>>>>>> parent of 2b6a528... Merge branch 'master' of https://github.com/unisse-courses/s15-mp12
=======
router.post('/addRecipe', uploadRecipe.single('foodPicture'), recipeFormsValidation, recipeController.addRecipe);
>>>>>>> parent of aed1abe... Like and cooked
