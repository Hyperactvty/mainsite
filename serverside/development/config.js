const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  atlas: process.env.DBURL,
  appdb: process.env.DB,
  userCollection: process.env.USERSCOLLECTION,
  port: process.env.PORT,
  graphql: process.env.GRAPHQLURL
};
