// Initialize the base modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
require('dotenv').config()

// Initialize the routes and the application
const routerCode = require('./routes/api/code.route');
const routerAuth = require('./routes/api/auth.route');
const routerUser = require('./routes/api/user.route');
const routerRoles = require('./routes/api/roles.route')
const app = express();

// Initialize the middleware
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configure the routes
app.use('/api/code', routerCode);
app.use('/api/auth', routerAuth);
app.use('/api/user', routerUser);
app.use('/api/roles', routerRoles);


// Connect to the database
mongoose.connect(process.env.DB_HOST_ADMIN)

// Configure the port. Uses standard node port, alternatively 3000 if not available
app.set('port', process.env.PORT || 3000);

// Make the app listen to the standard port
app.listen(app.get('port'), () =>
  console.log('App listening on port ' + app.get('port'))
);
