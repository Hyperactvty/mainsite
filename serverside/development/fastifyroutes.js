const { coll } = require("./config");
const dbRtns = require("./dbroutines");
// define a default route to retrieve all users
async function routes(fastify, options) {
  fastify.get("/api/users", async (request, reply) => {
    try {
      let db = await dbRtns.getDBInstance();
      let users = await dbRtns.findAll(db, coll);
      reply.status(200).send({ users: users });
    } catch (err) {
      console.log(err.stack);
      reply.status(500).send("get all users failed - internal server error");
    }
  });
}
module.exports = routes;
