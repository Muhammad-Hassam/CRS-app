const express = require("express");
const app = express();
require("./dbconnection");
const server = require("./server");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookie = require("cookie-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const Users = require("./dbmodels/user");
const fileupload = require("express-fileupload");
const path = require("path");

dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 4000;
const SECRET_KEY = process.env.SECRET_KEY;
app.use(
  "/",
  express.static(path.resolve(path.join(__dirname, "./CRS-frontend/build")))
);
app.use(express.json());
app.use(cookie());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(server);
app.use(fileupload());
app.use(express.static("files"));

app.use(function (req, res, next) {
  console.log(req.cookies.jwtoken);
  if (!req.cookies.jwtoken) {
    res.status(401).send("include http-only credentials with every request");
    return;
  }
  jwt.verify(req.cookies.jwtoken, SECRET_KEY, function (err, decodedData) {
    if (!err) {
      const issueDate = decodedData.iat * 1000;
      const nowDate = new Date().getTime();
      const diff = nowDate - issueDate;

      if (diff > 300000) {
        res.status(401).send("token expired");
      } else {
        var token = jwt.sign(
          {
            id: decodedData.id,
            email: decodedData.email,
            role: decodedData.role,
          },
          SECRET_KEY
        );
        res.cookie("jwtoken", token, {
          maxAge: 86400000,
          httpOnly: true,
        });
        req.body.jwtoken = decodedData;
        req.headers.jwtoken = decodedData;
        next();
      }
    } else {
      res.status(401).send("invalid token");
    }
  });
});

app.get("/profile", (req, res) => {
  console.log("profile", req.body.jwtoken);
  Users.findById(
    req.body.jwtoken.id,
    "uname email age skills gender imageURL intergrade cgpa matricgrade status services website contact role allow",
    function (err, doc) {
      console.log(doc);
      if (!err) {
        res.send({
          status: 200,
          profile: doc,
        });
      } else {
        res.status(500).send({
          message: "server error",
        });
      }
    }
  );
});

app.post("/logout", (req, res) => {
  res.clearCookie("jwtoken");
  res.send("JWT Clear");
});

app.listen(port, () => {
  console.log("server is running");
});
