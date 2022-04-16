const { Router } = require("express");
const fs = require("fs");
const fileName = "/src/toDoList.json";
let toDoList = require(".." + fileName);

const routes = new Router();

routes.get("/", (req, res) => {
  res.send(toDoList);
});

routes.post("/update/:id", (req, res) => {
  // parse id param into integer
  // so that it can be matched with the id property later
  const taskId = parseInt(req.params.id);
  const updatedList = toDoList.map((object) =>
    object.id === taskId ? { ...object, done: !object.done } : object
  );

  fs.writeFileSync(
    "./" + fileName,
    // 2 white space indenting, for readability json
    JSON.stringify(updatedList, null, 2) + "\n"
  );

  // Update toDoList since it is only imported once
  toDoList = updatedList;
  res.send(updatedList);
});

module.exports = routes;
