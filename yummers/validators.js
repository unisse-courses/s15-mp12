const {body} = require('express-validator');

const loginValidation = [
    //username field not empty
    body('username').not().isEmpty().withMessage("Username is required."),
    //password field not empty
    body('pass').not().isEmpty().withMessage("Password is required."),
];

const registerValidation = [
    //username field not empty
    body('username').not().isEmpty().withMessage('Username is required.'),
    
    //name field not empty
    body('name').not().isEmpty().withMessage("Name is required."),

    //email is a valid email address
    body('email').isEmail().withMessage("Invalid Email address."),

    //password is not empty
    body('pass').not().isEmpty().withMessage("Password is required."),
    
    //confirm password is same as password
    body('confirmPass').custom((value, {req}) => {
        if(value !== req.body.pass) {
            throw new Error("Passwords must match.");
        }
        return true;
    })
];

const editProfileValidation = [ 
   //username field not empty
   body('username').not().isEmpty().withMessage('Username is required.'),
    
   //name field not empty
   body('name').not().isEmpty().withMessage("Name is required."),
];

module.exports = {loginValidation, registerValidation, editProfileValidation};

