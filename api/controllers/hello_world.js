'use strict';
var util = require('util');

module.exports = {
  hello
};

function hello(req, res) {
  req.routeMap.push(resolveHello);
  req.routeMap.makeResponse(res);
}

function resolveHello(req, res, resolve, reject) {
  return new Promise(function(resolve, reject) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    var name = req.swagger.params.name.value || process.env.HELLO_DEFAULT;
    var hello = util.format('Hello, %s!', name);
    // this sends back a JSON response which is a single string
    req.logger.debug(`At resolveHello`);
    resolve(hello);
  });
}
