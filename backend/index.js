const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("./models/UserModel");

const cookieParser = require("cookie-parser");

const verifyToken = require("./middleware/verifyToken");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

//database connection
mongoose.connect("mongodb://127.0.0.1:27017/quizzy");

//signup
app.post("/signup", (req, res) => {
  let { fullname, email, password } = req.body;
  //hashing password using bcrypt
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      //creating new user
      UserModel.create({
        fullname,
        email,
        password: hash,
      })
        .then((users) => {
          //generating token using jsonwebtoken
          let token = jwt.sign({ email: email }, "SECRET_KEY");

          //settin cookie
          res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            path: "/", // Ensure cookie is set for entire site
          });

          res.json(users);
        })
        .catch((err) => res.json(err));
    });
  });
});

//login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  //searching for user on the basis of email
  UserModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (result) {
            // Add expiration to token
            let token = jwt.sign({ email: email }, "SECRET_KEY", {
              expiresIn: "24h",
            });

            //setting cookie
            res.cookie("token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax",
              maxAge: 24 * 60 * 60 * 1000, // 24 hours
              path: "/",
            });

            res.json({
              message: "Success",
              user: {
                email: user.email,
                fullname: user.fullname,
              },
            });
          } else {
            res.status(401).json({ message: "Incorrect Email or Password" });
          }
        });
      } else {
        res.status(404).json({ message: "User doesn't exist" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Server error", error: error });
    });
});


//logout
app.post("/logout", (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1,
    expires: new Date(0),
    path: "/",
  });

  res.clearCookie("token", {
    path: "/",
    domain: "localhost",
  });
  res.json({ success: true, message: "Logged out successfully" });
});

//sending user details for account page
app.get("/user-data", verifyToken, (req, res) => {
  UserModel.findOne({ email: req.user.email })
    .then((user) => {
      if (user) {
        res.json({
          email: user.email,
          fullname: user.fullname,
          createdAt: user.createdAt,
        });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((err) => res.status(500).json({ message: "Server error" }));
});

app.listen(3000, () => {
  console.log("Server running");
});
