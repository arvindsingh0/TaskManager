const Task = require("../models/Task");

// CREATE
exports.createTask = async (req, res) => {
  try {
    const newTask = new Task({ title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      user: req.user.id });

    await newTask.save();

    res.send("Task saved to database");
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

// READ
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching tasks");
  }
};

// UPDATE
exports.updateTask = async (req, res) => {
  try {
    console.log("USER FROM TOKEN:", req.user);  
    const updatedTask = await Task.findByIdAndUpdate(
     { _id: req.params.id, user: req.user.id },
  req.body,
  { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error updating task");
  }
};

// DELETE
exports.deleteTask = async (req, res) => {
  try {
    console.log("USER FROM TOKEN:", req.user);  
    await Task.findByIdAndDelete({
  _id: req.params.id,
  user: req.user.id
});
    res.send("Task deleted");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting task");
  }
};