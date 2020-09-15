/**
 * Init router
 */
const { Router } = require('express');
const router = Router();

/**
 * Init the validator middleware
 */
const { Validator } = require('express-json-validator-middleware');
const validator = new Validator({ allErrors: true });
const validate = validator.validate

/**
 * Import middlewares
 */
const { validate_Email, user_Created, check_User, check_Admin, autenticate_User, construct_JWT, extract_JWT } = require('../middleswares/index')

// const database = require('../database');

/**
 * Import schemas
 */
const user_schema_login = require('../schemas/user_schema_login');
const user_schema_register = require('../schemas/user_schema_register');
let status = false;

router.post('/register', validate({ body: user_schema_register }), validate_Email, user_Created, (req, res) => {
    res.send(req.body);
});



router.post('/login', validate({ body: user_schema_login }), check_Admin, check_User, autenticate_User, (req, res) => {
    res.json({
        status: 200,
        message: "hola",
        token: req.token
    });
    status = true
});

// router.get('/register',(req,res)=>{
//     res.send('has ingresado al servidor')
// })
module.exports = router;