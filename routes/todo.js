const router = require("express").Router();
const session = require('express-session')
const Todo = require("../models/Todo");

// routes
router
  .post("/add/todo", (req, res) => {
    console.log(req.session)
    const { todo } = req.body;
    const userId = req.session.user_id;
    const newTodo = new Todo({ 
      todo,userId
     });
    // save the todo
    newTodo
      .save()
      .then(() => {
        console.log("Successfully added todo!");
        res.redirect("/");
      })
      .catch((err) => console.log(err));
  })

  .post("/update/todo/:_id", (req, res) => {
    const { _id } = req.params;
    const { updatedTodo } = req.body;
    const userId = req.session.user_id;
    let query = {_id,userId}
    Todo.findOneAndUpdate(query, { todo: updatedTodo})
      .then(() => {
        console.log("Updated Todo Successfully!");
        res.redirect("/");
      })
      .catch((err) => console.log(err));
  })
  .post("/complete/todo/:_id", async (req, res) => {
    const { _id } = req.params;
    const userId = req.session.user_id;
    let query = {_id,userId}
    var toDo = await Todo.findOneAndUpdate(query, { completed: true})
      .then(() => {
        console.log("Marked Todo as Completed!");
        res.redirect("/");
      })
      .catch((err) => console.log(err));
      console.log(toDo)
  })

  .post("/incomplete/todo/:_id", (req, res) => {
    const { _id } = req.params;
    const userId = req.session.user_id;
    let query = {_id,userId}
    Todo.findOneAndUpdate(query, { completed: false})
        .then(() => {
            console.log("Marked Todo as Incomplete!");
            res.redirect("/");
        })
        .catch((err) => console.log(err));
  })

  .get("/delete/todo/:_id", (req, res) => {
    const { _id } = req.params;
    const userId = req.session.user_id;
    let query = {_id,userId}
    Todo.deleteOne(query)
      .then(() => {
        console.log("Deleted Todo Successfully!");
        res.redirect("/");
      })
      .catch((err) => console.log(err));
  });

module.exports = router;