'use strict';
// Middleware for contextual logging
var logger = require('logging-express-mw');
// Middleware for writing good apis
var routeMap = require('routemap-express-mw');
// Middleware to integrate with bookshelf apis
var bookshelf = require('bookshelf-express-mw');
// Middleware for writing good apis
var routeMap = require('routemap-express-mw');
// Parse incoming request bodies in a middleware
// before your handlers, available under
// the req.body property.
var bodyParser = require('body-parser');
// Middleware that enables CORS requests
var cors = require('cors');
// Load environment variables
require('dotenv').config()

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))

// CORS enabled with options
// {
//   "origin": "*",
//   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//   "preflightContinue": false,
//   "optionsSuccessStatus": 204
// }
app.use(cors());
// Need to use `req.logger`
app.use(logger.middleware());
// mw to write elegant apis
app.use(routeMap());

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log(`try this:\ncurl http://127.0.0.1:' ${port} /hello?name=routemap`);
  }
});
