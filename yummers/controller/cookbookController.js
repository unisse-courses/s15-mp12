const cookbookModel = require('../models/cookbook');

//get user's cookbook
exports.getCookbook = function(req, res) {
	if(req.session.user)
		cookbookModel.getAll({user: req.params.userId}, '', function(dbres) {
            
            var recipes = dbres.map(cookbook => {
                return cookbook.recipe;
            });
			res.render('recipebook', {
				title: 'Recipe Book',
				recipes: recipes
			});
		});
	else { 
		req.flash('error_msg', "Please login to continue.");
		res.redirect('/login');
	}
}
