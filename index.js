const express = require("express");
const app = express();

// JS Validation
const { body, validationResult } = require("express-validator");

app.set("view engine", "pug");
app.set("views", "views");

// override with POST having ?_method=DELETE
// because HTML form only supports POST and GET methods
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const fs = require("fs");
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const filePath = __dirname + "/data.json";
const data = fs.readFileSync(filePath);
const parsedData = JSON.parse(data);

// generateRandomNumber helper function to generate unique number ID
function generateRandomNumber() {
  return Math.floor(Math.random() * 100);
}

app.get(`/`, (req, res) => {
  res.render(`index`, { tasks: parsedData });
});

// /todo create todo item
app.post(
  "/todo",
  body("task").notEmpty().withMessage("task description required"),
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    var todoReqObj = req.body;
    todoReqObj.id = generateRandomNumber();
    parsedData.push(todoReqObj);

    fs.writeFileSync(filePath, JSON.stringify(parsedData));
    res.render(`index`, { tasks: parsedData });
  }
);

// Update todo by todo ID
app.put(
  "/todo/:id",
  body("task").notEmpty().withMessage("task description required"),
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const indexOfObject = parsedData.findIndex((object) => {
      return object.id == req.params.id;
    });

    parsedData[indexOfObject] = {
      ...parsedData[indexOfObject],
      task: req.body.task,
    };

    fs.writeFileSync(filePath, JSON.stringify(parsedData));
    res.render(`index`, { tasks: parsedData });
  }
);

// /todo/:id deletes todo item by todoID
app.delete("/todo/:id", (req, res) => {
  const indexOfObject = parsedData.findIndex((object) => {
    return object.id == req.params.id;
  });
  parsedData.splice(indexOfObject, 1);

  fs.writeFileSync(filePath, JSON.stringify(parsedData));
  res.render(`index`, { tasks: parsedData });
});

app.listen(3000);
