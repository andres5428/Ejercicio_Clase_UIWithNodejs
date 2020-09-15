const database = require('../database/database');
let session_State = false;

/**
 * @method validate_Email
 * @description checks if the e-mail that want to register is already in the database
 */

const validate_Email = ((req, res, next) => {
    const email_Search = database.users.find(elem => elem.username === req.body.username);
    // !email_Search ? next() : res.end('El usuario ingresado ya está registrado en la base de datos');
    if (!email_Search) {
        next();
    }
    else {
        res.status('400').end('El usuario ingresado ya está registrado en la base de datos. Por favor intente con uno diferente');
    }

});

/**
 * @method user_Created
 * @description Push the data of the new user into the database
 */

const user_Created = ((req, res, next) => {
    database.users.push(req.body);
    next();
});

/**
 * @method check_Admin
 * @description
 */
const check_Admin = ((req, res, next) => {
    const admin_Search = database.admin.find(user => {
        return user.username === req.body.username
    });
    // !admin_Search ? next() : res.status('400').end('Administrador ');
    if (admin_Search) {
        let admin_Index = (database.admin.findIndex(user => {
            return user.username === req.body.username
        }))
        if (database.admin[admin_Index].password === req.body.password) {
            res.status('200').end('Administrador autenticado!')
            next();
        }
        else {
            res.status('401').end('La contraseña de administrador es incorrecta')
        }
    }
    next();
});


/**
 * @method check_User
 * @description Autenticate the username sended from the client
 */

const check_User = ((req, res, next) => {
    const email_Search = database.users.find(user => {
        return user.username === req.body.username
    });
    !email_Search ? res.status('400').end('Este usuario no está registrado') : next();
});


/**
 * @method autenticate_User
 * @description Autenticate the credentials sended from the client
 */
const autenticate_User = ((req, res, next) => {
    let user_Index = (database.users.findIndex(user => {
        return user.username === req.body.username
    }));
    if (database.users[user_Index].password === req.body.password) {
        // res.end('Usuario autenticado!');
        // session_State = true;
        next();
    } else {
        res.status('400').end('Contraseña inválida');
    }
});

/**
 * Json Web Token Init
 */
const jwt = require('jsonwebtoken');

/**
 * @method construct_JWT  
 * @description Generate a Jason Web Token from the body request information
 */

const construct_JWT = ((req, res, next) => {
    const token = jwt.sign(req.body, 'minu123byvt567', { expiresIn: '1m' });
    req.token = token
    next();
})

/**
 * @method extract_JWT
 * @description Take the token that the user bring and separate it from the bearer method
 */

const extract_JWT = ((req, res, next) => {
    const bearerHeader = req.headers['autorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" "); // divides the strings into a ordered list of substrings and returns them into an array
        const bearerToken = bearer[1]; // Take the second position of the array (Token)
        req.token = bearerToken;
        next();
    }
    else {
        res.status(403).end('No has ingresado un Token válido');
    }
});

module.exports = { validate_Email: validate_Email, user_Created: user_Created, check_User: check_User, check_Admin: check_Admin, autenticate_User: autenticate_User, construct_JWT: construct_JWT, extract_JWT: extract_JWT };