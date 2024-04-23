// routes/index.js
const session = require('express-session')
const router = require("express").Router()
const Todo = require("../models/Todo");

// routes will be here....
// GET route to fetch tasks
router.get("/", async (req, res) => {
    try {
      const allTodo = await Todo.find({ userId: req.session.user_id }); // Fetch tasks for the authenticated user
      res.render("index", { todo: allTodo });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });
module.exports = router;



