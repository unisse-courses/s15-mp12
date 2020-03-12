const express = require('express');
const hbs = require('express-handlebars');
const handlebars = require('handlebars');
const app = express();
const port = 9090;

//Create recipe object
var recipe = [{
	name: 'Chocolate Chip Cookies',
	author: 'Nikki Domingo',
	id: 1,
	date: 'January 12, 2020',
	servings: '15 Cookies'
},
{
	name: 'Pinoy Chicken Adobo',
	author: 'Charlene Ang',
	id: 2,
	date: 'January 20, 2020',
	servings: '4 people'
},
{
	name: 'Leche Flan',
	author: 'Charlene Ang',
	id: 3,
	date: 'December 24, 2019',
	servings: '10 people'
},
{
	name: 'Classic Cheesecake',
	author: 'Nikki Domingo',
	id: 4,
	date: 'December 21, 2019',
	servings: '12 people'
},
{
	name: 'Japanese Souffle Pancakes',
	author: 'Nikki Domingo',
	id: 5,
	date: 'January 17, 2020',
	servings: '4(4-inch) pancakes'
}
];

app.set('view engine', 'hbs');

app.engine('hbs', hbs({
	extname: 'hbs',
	defaultView: 'default',
	layoutsDir: __dirname + '/views/layouts/',
	partialsDir: __dirname + '/views/partials/'
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
app.get('/recipe/:recipeId', (req, res) => {
	res.render('recipe')
})

//set css folder
app.use(express.static('public'));

