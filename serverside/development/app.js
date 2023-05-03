const { port } = require("./config");
// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
const routes = require("./fastifyroutes");

/** @link https://www.youtube.com/watch?v=nI8PYZNFtac */
//#region Stuff from here
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fs = require('fs');
//#endregion Stuff

function generateAccessToken(username) {
  return jwt.sign({ username }, process.env.TOKEN_SECRET, { expiresIn: "1800s", });
}

fastify.register(require("fastify-cors"), {});
// register the route module
fastify.register(routes);
// start the fastify server
fastify.listen(port, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
