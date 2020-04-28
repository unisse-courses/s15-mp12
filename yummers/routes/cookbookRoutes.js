const router = require('express').Router();
module.exports = router;

const mongoose = require('mongoose');

const cookbookController = require('../controller/cookbookController');

//Add a recipe to cookbook
router.post('/add/', cookbookController.addCookbook);

//Remove a recipe in cookbook
router.post('/remove/', cookbookController.removeCookbook);