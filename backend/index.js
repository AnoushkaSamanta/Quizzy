const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const UserModel=require("./models/UserModel")
const cookieParser = require("cookie-parser")
const verifyToken=require("./middleware/verifyToken")
const app=express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173", // Change this to your frontend URL
    credentials: true
}));

app.use(cookieParser())


mongoose.connect("mongodb://127.0.0.1:27017/quizzy")

app.post("/signup", (req, res) => {
    let { fullname, email, password } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        UserModel.create({
          fullname,
          email,
          password: hash,
        })
          .then((users) => {
            let token = jwt.sign({ email: email }, "SECRET_KEY");
            res.cookie("token", token, {
              httpOnly: true,
              secure: false, // Set to true in production
              sameSite: 'strict', // or 'lax'
              maxAge: 24 * 60 * 60 * 1000, // 24 hours
              path: '/' // Ensure cookie is set for entire site
          });
          
            res.json(users);
          })
          .catch((err) => res.json(err));
      });
    });
  });

  app.post("/login", (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email }).then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (result) {
            // Add expiration to token
            let token = jwt.sign(
              { email: email }, 
              "SECRET_KEY", 
              { expiresIn: '24h' }
            );
            
            // More specific cookie settings
            res.cookie("token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production", // Secure in production
              sameSite: 'lax', // More compatible across browsers
              maxAge: 24 * 60 * 60 * 1000, // 24 hours
              path: '/'
            });
            
            // Send structured response
            res.json({ 
              message: "Success", 
              user: { 
                email: user.email, 
                fullname: user.fullname 
              }
            });
          } else {
            res.status(401).json({ message: "Incorrect Email or Password" });
          }
        });
      } else {
        res.status(404).json({ message: "User doesn't exist" });
      }
    }).catch(error => {
      res.status(500).json({ message: "Server error", error: error });
    });
  });

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


  // Add this to your index.js
app.get("/user-data", verifyToken, (req, res) => {
  UserModel.findOne({ email: req.user.email })
    .then(user => {
      if (user) {
        res.json({ 
          email: user.email, 
          fullname: user.fullname 
        });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch(err => res.status(500).json({ message: "Server error" }));
});

app.listen(3000,()=>{
    console.log("Server running");
    
})