const cookbookModel = require('../models/cookbook');
const recipeModel = require('../models/recipes');

//get user's cookbook
exports.getCookbook = function(req, res) {
	cookbookModel.getAll({user: req.params.userId}, '', function(dbres) {
            
		var recipes = dbres.map(cookbook => {
			return cookbook.recipe;
		});
		res.render('recipebook', {
			title: 'Recipe Book',
			recipes: recipes
		});
	});
}

exports.addCookbook = function(req, res) {
	var cookbook = cookbookModel.create(req.session.user._id, req.body.id);
	cookbookModel.insertOne(cookbook, function(result) {
		res.send(result);
	});
}
