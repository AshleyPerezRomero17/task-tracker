const express = require("express");
const app = express();

app.set("view engine", "pug");
app.set("views", "views");

const fs = require ("fs");
const bodyParser = require ("body-parser");

// create application/json parser
var jsonParser = bodyParser.json()

const filePath = __dirname + "/data.json"
const data = fs.readFileSync(filePath);
const parsedData = JSON.parse(data);

// generateRandomNumber helper function to generate unique number ID 
function generateRandomNumber() {
  return Math.floor(Math.random() * 100)
}

app.get(`/`, (req, res) => {
  res.render(`index`, {tasks: parsedData });
});

// /todo create todo item
app.post("/todo", jsonParser, function (req, res) {
  var todoReqObj = req.body
  todoReqObj.id = generateRandomNumber();
  parsedData.push(todoReqObj)

  fs.writeFileSync(filePath, JSON.stringify(parsedData))
  res.sendStatus(201).redirect("/");
});

// Update todo by todo ID
app.put("/todo/:id", jsonParser, function (req, res) {
  var indexOfObject = parsedData.findIndex(object => {
    return object.id == req.params.id
  })

  parsedData[indexOfObject] = {
    ...parsedData[indexOfObject], task: req.body.task
  }

  fs.writeFileSync(filePath, JSON.stringify(parsedData))
  res.sendStatus(200).redirect("/");
});

// /todo/:id deletes todo item by todoID
app.delete("/todo/:id", (req, res) => {
  var indexOfObject = parsedData.findIndex(object => {
    return object.id == req.params.id
  })
  parsedData.splice(indexOfObject, 1)

  fs.writeFileSync(filePath, JSON.stringify(parsedData))
  res.sendStatus(204).redirect("/");
});

app.listen(3000);
