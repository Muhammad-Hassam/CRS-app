const express = require("express");
const router = new express.Router();
const Users = require("./dbmodels/user");
const Job = require("./dbmodels/jobs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const ApplyJobs = require("./dbmodels/jobapply");
const path = require("path");
dotenv.config({ path: "./config.env" });
const SECRET_KEY = process.env.SECRET_KEY;
app.use(
  "/",
  express.static(path.resolve(path.join(__dirname, "./CRS-frontend/build")))
);

router.post("/signup", (req, res) => {
  const {
    uname,
    email,
    password,
    age,
    skills,
    gender,
    imageURL,
    intergrade,
    qualification,
    specialization,
    cgpa,
    matricgrade,
    status,
    services,
    website,
    contact,
    role,
    allow,
  } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: "Kindly fill all the fields" });
  } else {
    Users.findOne({ email: email })
      .then((userExist) => {
        if (userExist) {
          return res.send({ status: 422, error: "Email exist" });
        } else {
          const user = new Users({
            uname,
            email,
            password,
            age,
            skills,
            gender,
            imageURL,
            intergrade,
            cgpa,
            matricgrade,
            qualification,
            specialization,
            status,
            services,
            website,
            contact,
            role,
            allow,
          });
          user
            .save()
            .then(() => {
              res.status(200).send({ message: "User register" });
              console.log("User register");
            })
            .catch((err) => {
              res.status(500).send({ err: "Registration failed" });
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

router.post("/createjobs", (req, res) => {
  const {
    uname,
    email,
    skills,
    description,
    experience,
    website,
    contact,
    jobtype,
    id,
  } = req.body;
  console.log(req.body);
  const user = new Job({
    uname,
    id,
    email,
    skills,
    description,
    experience,
    website,
    contact,
    jobtype,
  });
  user
    .save()
    .then(() => {
      res.send({ status: 200, message: "Job created" });
      console.log("User register");
    })
    .catch((err) => {
      res.status(500).send({ err: "Registration failed" });
    });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ error: "Kindly fill all the fields" });
    } else {
      const login = await Users.findOne({ email: email });
      if (login) {
        const passMatch = await bcrypt.compare(password, login.password);
        console.log("login", req.headers.login);
        const token = jwt.sign(
          {
            id: login._id,
            email: login.email,
            role: login.role,
          },
          SECRET_KEY
        );
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 300000),
          httpOnly: true,
        });

        if (!passMatch) {
          res.send({ status: 400, error: "Invalid User" });
        } else {
          res.send({ status: 200, message: "Login successfully", data: login });
        }
      } else {
        res.status(400).send({ error: "Invalid data" });
      }
    }
  } catch (err) {
    res.send({ err: "Operations Failed" });
  }
});

router.post("/userremove", async (req, res) => {
  try {
    const user = req.body.id;
    if (!user) {
      return res.status(400).send("id is not present");
    } else {
      const deleteuser = await Users.findByIdAndDelete(user);
      res.staus(200).send(deleteuser);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/userupdate", async (req, res) => {
  try {
    const user = req.body.id;
    if (!user) {
      return res.status(400).send("id is not present");
    } else {
      const upadateUser = await Users.findByIdAndUpdate(user, req.body, {
        new: true,
      });
      res.status(200).send(upadateUser);
    }
  } catch (e) {
    res.status(500).send(e);
    console.log(e);
  }
});

router.post("/jobremove", async (req, res) => {
  try {
    const user = req.body.id;
    if (!user) {
      return res.status(400).send("id is not present");
    } else {
      const deleteuser = await Job.findOneAndDelete(user);
      res.status(200).send({ message: "Job deleted" });
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/jobupdate", async (req, res) => {
  try {
    const user = req.body._id;
    if (!user) {
      return res.send({ status: 400, message: "id is not present" });
    } else {
      const upadateUser = await Job.findByIdAndUpdate(user, req.body, {
        new: true,
      });

      res.status(200).send(upadateUser);
    }
  } catch (e) {
    res.status(500).send(e);
    console.log(e);
  }
});

router.get("/user", (req, res) => {
  Users.find({}, (err, data) => {
    if (data) {
      res.send({
        data: data,
        status: 200,
      });
    } else {
      res.send(err, { message: "data is not available" });
    }
  });
});

router.get("/jobs", (req, res) => {
  Job.find({}, (err, data) => {
    if (data) {
      res.send({
        data: data,
        status: 200,
      });
    } else {
      res.send(err, { message: "data is not available" });
    }
  });
});

router.post("/applyjob", async (req, res) => {
  try {
    const { email, name, cv, jobID, userID } = req.body;
    const user = new ApplyJobs({
      email,
      name,
      cv,
      jobID,
      userID,
    });
    user
      .save()
      .then(() => {
        res.status(201).send({ message: "apply successfully" });
        console.log("User register");
      })
      .catch((err) => {
        res.status(500).send({ err: "Registration failed" });
      });
    console.log(user);
  } catch (err) {
    res.send({ err: "Operations Failed" });
  }
});

router.get("/applyjob", (req, res) => {
  ApplyJobs.find({}, (err, data) => {
    if (data) {
      res.send({
        data: data,
        status: 200,
      });
    } else {
      res.send(err, { message: "data is not available" });
    }
  });
});

module.exports = router;
