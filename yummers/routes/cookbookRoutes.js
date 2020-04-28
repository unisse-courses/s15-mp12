const router = require('express').Router();
module.exports = router;

const mongoose = require('mongoose');

const cookbookController = require('../controller/cookbookController');

router.post('/add/', cookbookController.addCookbook);