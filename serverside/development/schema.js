const { buildSchema } = require("graphql");
const schema = buildSchema(`
type Query {
 users: [User],
 signinuser(email: String, password: String): User,
 grabEmail(email: String): User,
 grabUsername(username: String): User,
 grabProfileData(UUID: String): User,
 confirmUserPassword(UUID: String, password: String): User,
}
type User {
 _id: ID,
 UUID: String,
 email: String,
 username: String, 
 firstname: String, 
 lastname: String, 
 password: String, 
 verified: Boolean,
 country: String,

 badges: Badges,
 profilepictureURI: String,
 isMatch: Boolean,
},
type Badges {
   name: String!, 
   date: String!, 
},
type FB_Fish {
 _id: ID,
 
},
type FB_User {
 _id: ID,
 
},
type Mutation {
 newuserregister(
    UUID: String,
    email: String,
    username: String, 
    firstname: String, 
    lastname: String, 
    password: String, 
    verified: Boolean,
    country: String): User,

 updateusercountry(
    UUID: String,
    country: String
 ): User,

 updatefullname(
    UUID: String,
    firstname: String,
    lastname: String
 ): User,

 updatepassword(
   UUID: String,
   password: String
): User,

 updateprofilepicture(
   UUID: String,
   profilepictureURI: String
): User,
}
`);
module.exports = { schema };
