// routes/auth.js
const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const session = require('express-session')

router.use(session({
  secret: "your_secret_key", // Change this to a random secret key
  resave: false,
  saveUninitialized: true
}));

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {

  let userId;
  const data = await User.find({});
  if(data.length > 0){
    userId = data.length+1;
  }else{
    userId = 1;
  }
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }
    const newUser = new User({ username, email, password,userId });
    await newUser.save();
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).send("Invalid password");
    }else{
      req.session.user_id = user.userId;
      
      // Here you can create a session for the user
      res.redirect("/"); // Redirect to the todo page or wherever you want
    }
    
    
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
//Logout route (GET request to show the logout page)
router.get("/logout", (req, res) => {
    res.render("logout");
});

// Logout route (POST request to clear session and redirect to login page)
// routes/auth.js
router.post("/logout", (req, res) => {
    // Check if req.session is defined before attempting to destroy it
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                console.error("Error destroying session:", err);
                res.status(500).send("Server Error");
            } else {
                // Redirect the user to the login page after logout
                res.redirect("/login");
            }
        });
    } else {
        // If session is not defined, redirect to login page
        res.redirect("/login");
    }
});

module.exports = router;