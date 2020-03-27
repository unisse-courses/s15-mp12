const recipe = require('./recipes');

//create user objects

var users = [{
    name: 'Nikki Domingo',
    joinDate: 'January 1, 2019',
    password: '1234',
    email: 'nikki_domingo@dlsu.edu.ph',
    recipes: [recipe[0], recipe[3], recipe[4]]
},
{
    name: 'Charlene Ang',
    joinDate: 'July 28, 2019',
    password: '5678',
    email: 'charlene_ang@dlsu.edu.ph',
    recipes: [recipe[1], recipe[2]]
},
{
    name: 'Ronell Roxas',
    joinDate: 'December 01, 2019',
    password: '2468',
    email: 'ronell_roxas@dlsu.edu.ph',
    recipes: null
}
]

//for mongoose. Basic schema ng users natin
// const mongoose = require('mongoose');
// const userSchema = mongoose.Schema({
//     id: mongoose.Types.ObjectId,
//     name: String,
//     joinDate: Date,
//     password: String,
//     email: String,
//     recipes: [recipeSchema]
// })

module.exports = users;