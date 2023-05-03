// const dbRtns = require("./dbroutines");
// const { userCollection } = require("./config");

const bcrypt = require('bcrypt'); // import the Library. 
//const fastify = require('fastify')
// ({
//   logger: true
// });

/**
 * Function calculation_hash(password,salt,pepper,iteration)
Inputs
password is the user's password in plain text
salt is the unique salt per user and is randomly generated
pepper is the common pepper for all users and is randomly generated.
iteration is the number of iterations

Output:
The password hash
Hash = sha512(salt+password+pepper)
As long as iteration is greater than 0
hash = sha512(hash)
Decrement iteration

return hash
 */

function securePassword(_pwd) {
    const saltRounds = 10; // The number of rounds for encrypt the passwords. 
    //const myPlaintextPassword = 'examplePassword';
    
    // Now, use bcrypt for encrypt the plain Password. 
    
    bcrypt.hash(_pwd, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        console.log(hash); 
        return hash;
        //fastify.log.info("E");
    });
};

function retreivePassword(_pwd, _hash, _data) {
    bcrypt.compare(_pwd, _hash, function(err, result) {
        // let db = await dbRtns.getDBInstance();
        // const dbGrab = await dbRtns.findOne(db, userCollection, { UUID: args.UUID,/*email: args.email,*/ password: args.password });
        // let isMatch = dbGrab!==null;
        //return {isMatch:isMatch, password:dbGrab.password};

            // result == true
        if(result==true){
        // The Password is Correct!
        console.log("Pwd Correct"); 
        return {result:true, attempts:0};
        }
        else {
        // Your password is not correct. 
        console.log("Pwd False"); 
        // return {result: false, attempts:_data.attempts++};
        return false;
        }
    });
};

module.exports = {
    securePassword,retreivePassword,
};