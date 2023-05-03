const jwt = require('jsonwebtoken');

function generateAccessToken(username) {
  return jwt.sign({ username }, process.env.TOKEN_SECRET, { expiresIn: "1800s", });
}

const login = async (req, res = response) => {
  const { email, password } = req.body;
  // Ideally search the user in a database and validate password, throw an error if not found.
  const user = getUserFromDB({ email, password });
  
  if (user) {
    const token = generateAccessToken(user?.username);
    res.json({
      token: `Bearer ${token}`,
    });
  } else res.sendStatus(401);
};

function validateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.tokenData = decoded;
    next();
  });
}

//#region Clear DB
const dbRtns = require("./dbroutines");
const rawJSON = `[{"email": "bt@abc.com", "username": "hyperactvty", "firstname": "Brayden", "lastname": "Thompson", "password": "12345", "country": "Canada"}]`;

const reloadUsers = async () => {
  let someUsers = JSON.parse(rawJSON);
  try {
    db = await dbRtns.getDBInstance();
    let results = await dbRtns.deleteAll(db, "users");
    console.log(
      `deleted ${results.deletedCount} documents from users collection`
    );
    let resultArray = await Promise.allSettled(
      someUsers.map((user) => {
        return dbRtns.addOne(db, "users", user);
      })
    );
    resultArray.forEach((result) => {
      result.value.acknowledged
        ? console.log(
            `Promise ${result.status} and document added to users collection`
          )
        : console.log(
            `Promise ${result.status} and document not added to users collection`
          );
    });
    let someUser = await dbRtns.findOne(db, "users", {
      firstname: "Brayden",
    });
    console.log(
      `User ${someUser.firstname} was found. This user's email address is ${someUser.email}`
    );
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
};
// If you want to refresh the MongoDB database, execute this line
// reloadUsers();

//#endregion Clear DB