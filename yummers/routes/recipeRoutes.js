const router = require('express').Router();
module.exports = router;

const mongoose = require('mongoose');

const userController = require('../controller/userController');
const recipeController = require('../controller/recipeController');

router.get('/:recipeId', recipeController.getRecipePage);

router.get('/:recipeId/edit', recipeController.editRecipePage);