const express = require('express');
const hbs = require('express-handlebars');
const handlebars = require('handlebars');
const app = express();
const port = 9090;

//import recipe objects
const recipe = require('./recipes');

function getRecipe(id) {
	return recipe[id];
}

app.set('view engine', 'hbs');

app.engine('hbs', hbs({
	extname: 'hbs',
	defaultView: 'default',
	layoutsDir: __dirname + '/views/layouts/',
	partialsDir: __dirname + '/views/partials/',
	helpers: {
		recipeImg: function(recipe) {
			return '<img class="recipe-img col-lg-12" src="img/recipe_' + recipe.id + '.jpg" alt="' + recipe.name + '"></img>';
		}
	}
}));

app.listen(port, () => {
	console.log('App listening at port ' + port);
});

app.get('/', (req, res) => {
	res.render('home', {
	title: 'Yummers!',
	recipe_list : recipe});
});

app.get('/profile', (req, res) => {
	res.render('profile', {
	fn: 'Ronell',
	ln: 'Roxas',
	title: 'Profile Page',
	recipe_list : recipe});
});

app.get('/login', (req, res) =>  {
	res.render('login', {
	title: 'Login/Signup'});
});

app.get('/add_recipe', (req, res) =>  {
	res.render('add_recipe', {
	title: 'Add recipe'});
});


//not working pa
app.get('/recipe=:recipeId', (req, res) => {
	res.render('recipe', {
		recipeFound: getRecipe(req.params.recipeId - 1)
	});
});

//set css folder
app.use(express.static('public'));

