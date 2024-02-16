const TaskModels = require("../models/TaskModels");

module.exports.getTasks = async (req, res) => {
  const tasks = await TaskModels.find();
  res.send(tasks);
};

module.exports.saveTasks = (req, res) => {
  const { task } = req.body;

  TaskModels.create({ task })
    .then((data) => {
      console.log("Saved Successfulyy...");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong" });
    });
};

module.exports.updateTasks = (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  TaskModels.findByIdAndUpdate(id, { task })
    .then(() => res.send("Updated Successfulyy"))
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong" });
    });
};

module.exports.deleteTasks = (req, res) => {
  const { task } = req.body;
  const { id } = req.params;

  TaskModels.findByIdAndDelete(id, { task })
    .then(() => res.send("Deleted Successfulyy"))
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong" });
    });
};
