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
    body('email').isEmail().withMessage("Invalid Email address."),
    body('pass').not().isEmpty().withMessage("Password is required."),
    body('confirmPass').custom((value, {req}) => {
        if(value !== req.body.pass) {
            throw new Error("Passwords must match.");
        }
        return true;
    })
];

module.exports = {loginValidation, registerValidation};

