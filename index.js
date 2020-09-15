/**
 * Init dependencies
 */
require('dotenv').config();

/**
 * Server init and configuration
 */

const express = require('express');
const server = express();
const port = process.env.PORT;

server.listen(port, () => {
  console.log(`El servidor está funcionando a través del puerto ${port}`);
});

/**
 * Database and userschema import
 */
const database = require('./database/database');
const user_schema_register = require('./schemas/user_schema_register');
const user_schema_login = require('./schemas/user_schema_login');


/**
 * ErrorHandler
 */
const { errorHandler } = require('./middleswares/errorhandler');

/**
 * Routing
 */
const routes = require('./routes/routes');

/**
 * Middlewares
 */
var cors = require('cors');
server.use(cors()); //Enable CORS Origin *
server.use(express.json());
server.use(routes);
server.use(errorHandler);
