// Initialize the base modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
require('dotenv').config()

// Initialize the routes and the application
const routerAuth = require('./routes/api/auth.route');
const routerAdmin = require('./routes/api/admin.route')
const app = express();

// Initialize the middleware
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configure the routes
app.use('/api/auth', routerAuth);
app.use('/api/admin', routerAdmin);

// Configure the port. Uses standard node port, alternatively 3000 if not available
app.set('port', process.env.PORT || 3000);

// Make the app listen to the standard port
app.listen(app.get('port'), () =>
  console.log('App listening on port ' + app.get('port'))
);
