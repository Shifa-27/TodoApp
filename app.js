const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session')

const app = express();

// Initialize session middleware
app.use(session({
    secret: "your_secret_key", // Change this to a random secret key
    resave: false,
    saveUninitialized: true
}));

mongoose.connect('mongodb+srv://shifamuskaan27:shifa321@cluster0.poocm6v.mongodb.net/users?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});



// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");



// routes
app.use(require("./routes/auth")); // Login and register routes should come first
app.use(require("./routes/index"));
app.use(require("./routes/todo"));




// server configurations....
app.listen(5800, () => console.log("Server started listening on port: 5800"));
