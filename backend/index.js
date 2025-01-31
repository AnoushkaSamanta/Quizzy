const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const UserModel = require("./models/UserModel");
const verifyToken = require("./middleware/verifyToken");
const generateToken = require("./middleware/generateToken");

// Importing bcrypt utility functions
const { hashPassword, comparePasswords } = require("./utilities/bcryptUtil");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);

app.use(cookieParser());

// database connection
mongoose.connect("mongodb://127.0.0.1:27017/quizzy");

// signup
app.post("/signup", async (req, res) => {
  let { fullname, email, password } = req.body;

  try {
    // Hashing password using bcrypt utility
    const hashedPassword = await hashPassword(password);

    // Creating new user
    const newUser = await UserModel.create({
      fullname,
      email,
      password: hashedPassword,
    });

    // Generating token using generateToken function
    let token = generateToken(email);

    // Setting cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      path: "/",
    });

    res.json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Searching for user based on email
    const user = await UserModel.findOne({ email: email });
    if (user) {
      // Comparing password using bcrypt utility
      const isPasswordCorrect = await comparePasswords(password, user.password);

      if (isPasswordCorrect) {
        // Generating token using generateToken function
        let token = generateToken(email);

        // Setting cookie
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
    } else {
      res.status(404).json({ message: "User doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
  }
});

// logout
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

// Sending user details for account page
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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running");
});
