const dbRtns = require("./dbroutines");
const { userCollection } = require("./config");
// import {commands as fbCmds} from "./projects/fishbot/commands";
// const {fbCmds} = require("./projects/fishbot/commands");
const {securePassword,retreivePassword} = require("./utils/cybersecurity");
/** My UUID Generator */
function newUUID() {
    var genUUID = "";
    var b = [false, true, false];
    b.forEach((_b) => {
      var _UUID = (Math.random().toString(16) + "000000000").substring(2, 12);
      genUUID += _b
        ? "-" + _UUID.substring(0, 4) + "-" + _UUID.substring(6, 10) + "-"
        : _UUID;
    });
    return genUUID;
}
const resolvers = {
  users: async () => {
    let db = await dbRtns.getDBInstance();
    return await dbRtns.findAll(db, userCollection, {}, {});
  },
  // userbyemail: async (args) => {
  //   let db = await dbRtns.getDBInstance();
  //   return await dbRtns.findOne(db, userCollection, { email: args.email });
  // },
  signinuser: async (args) => {
    let db = await dbRtns.getDBInstance();
    return await dbRtns.findOne(db, userCollection, { email: args.email, password: args.password });
  },
  grabEmail: async (args) => {
    let db = await dbRtns.getDBInstance();
    return await dbRtns.findOne(db, userCollection, { email: args.email});
  },
  grabUsername: async (args) => {
    let forbiddenNames = ["Admin", "System"];
    // if(args.username.toLowerCase())
    if(forbiddenNames.some(_un => _un.toLowerCase() === args.username.toLowerCase() )) {
      return /*await*/ {username:"!ERROR_USERNAMEFORBIDDEN"};
    }
    let db = await dbRtns.getDBInstance();
    return await dbRtns.findOne(db, userCollection, { username: args.username });
  },

  //#region Confirmation Methods
  confirmUserPassword: async (args) => {
    let db = await dbRtns.getDBInstance();
    const dbGrab = await dbRtns.findOne(db, userCollection, { UUID: args.UUID,/*email: args.email,*/ password: args.password });
    let _HPW = securePassword(args.password);
    /** If the args.result exists, then run it again using the results */
    let _UHPW = retreivePassword(args.password, _HPW, args?.result ? args?.result : null);
    console.log("Hashed Password:",_HPW);
    console.log("Unhashed Password:",_HPW);
    let isMatch = dbGrab!==null;
    return {isMatch:isMatch, password:dbGrab.password};
  },
  //#endregion Confirmation Methods

  newuserregister: async (args) => {
    let db = await dbRtns.getDBInstance();
    let user = { 
        UUID: newUUID(),
        email: args.email,
        username: args.username, 
        firstname: args.firstname, 
        lastname: args.lastname, 
        password: securePassword(args.password), 
        verified: false,
        country: args.country!=="Private" ? args.country.toString() : "N/A",
        // imageURI: null,
      };
    let results = await dbRtns.addOne(db, userCollection, user);
    console.log(user);
    return results.acknowledged ? user : null;
  },

  updateusercountry: async (args) => {
    let db = await dbRtns.getDBInstance();
    let country = { country: args.country };
    // console.log({id: new ObjectID(args.id)});
    let results = await dbRtns.updateOne(
      db,
      userCollection,
      // { id: new ObjectID(args.id) },
      { UUID: args.UUID },
      country
    );
    return results.modifiedCount === 1 ? country : null;
  },

  updatefullname: async (args) => {
    let db = await dbRtns.getDBInstance();
    let fullname = { 
      firstname: args.firstname, 
      lastname: args.lastname, 
    };
    // console.log({id: new ObjectID(args.id)});
    let results = await dbRtns.updateOne(
      db,
      userCollection,
      // { id: new ObjectID(args.id) },
      { UUID: args.UUID },
      fullname
    );
    return results.modifiedCount === 1 ? fullname : null;
  },
  updatepassword: async (args) => {
    let db = await dbRtns.getDBInstance();
    let password = { 
      password: args.password, 
    };
    // console.log({id: new ObjectID(args.id)});
    let results = await dbRtns.updateOne(
      db,
      userCollection,
      // { id: new ObjectID(args.id) },
      { UUID: args.UUID },
      password
    );
    return results.modifiedCount === 1 ? password : null;
  },
  /**
   * @summary Use this to grab data for user profiles and such 
   */
  grabProfileData: async (args) => {
    let db = await dbRtns.getDBInstance();
    const dbGrab = await dbRtns.findOne(db, userCollection, { UUID: args.UUID});
    return {
      username: dbGrab.username, 
      country: dbGrab.country, 
      firstname: dbGrab.firstname, 
      lastname: dbGrab.lastname, 
      verified: dbGrab.verified, 
      profilepictureURI: dbGrab.profilepictureURI
    }; // { profilepictureURI: dbGrab.profilepictureURI };
  },
  updateprofilepicture: async (args) => {
    let db = await dbRtns.getDBInstance();
    let profilepictureURI = { profilepictureURI: args.profilepictureURI };
    // console.log({id: new ObjectID(args.id)});
    let results = await dbRtns.updateOne(
      db,
      userCollection,
      // { id: new ObjectID(args.id) },
      { UUID: args.UUID },
      profilepictureURI
    );
    return results.modifiedCount === 1 ? profilepictureURI : null;
  },

  //#region Fishbot Commands
  fishbotCommands: async (args) => {
    let commandIssued = { cmd: args.cmd };
    // return fbCmds.fish();
    
  },
  //#endregion Fishbot Commands
};

module.exports = { resolvers };
