const express = require('express');
const hbs = require('express-handlebars');
const handlebars = require('handlebars');
const app = express();
const port = 9090;

//import recipe objects
var recipe = require('./recipes');
var users = require('./users');


app.set('view engine', 'hbs');

app.engine('hbs', hbs({
	extname: 'hbs',
	defaultView: 'default',
	layoutsDir: __dirname + '/views/layouts/',
	partialsDir: __dirname + '/views/partials/',
	helpers: {
		recipeImg: function(recipe) {
			return '<img class="recipe-img col-lg-12" src="../img/recipe_' + recipe.id + '.jpg" alt="' + recipe.name + '"></img>';
		},
		formSwitch: function(type) {
			if (type == 0) return true;
			else return false;
		}
	}
}));

function getRecipes(userId) {
	var userRecipes = [];
	for(r of recipe) {
		if(r.author.id == userId) {
			userRecipes.push(r);
		}
	}
	return userRecipes;
}

app.listen(port, () => {
	console.log('App listening at port ' + port);
});

app.get('/', (req, res) => {
	res.render('home', {
	title: 'Yummers!',
	recipe_list : recipe});
});

app.get('/user=:userId', (req, res) => {
	res.render('profile', {
	user: users[req.params.userId - 1],
	recipe_list : getRecipes(req.params.userId)});
});

app.get('/form=:type', (req, res) =>  {
	res.render('userforms', {
	title: 'Login/Signup',
	type: req.params.type});
});

app.get('/add_recipe', (req, res) =>  {
	res.render('add_recipe', {
	title: 'Add recipe'});
});

app.get('/user=:userId/recipe=:recipeId', (req, res) => {
	res.render('recipe', {
		recipeFound: recipe[req.params.recipeId - 1],
		user: users[req.params.userId - 1]
	});
});

//set css folder
app.use(express.static('public'));

