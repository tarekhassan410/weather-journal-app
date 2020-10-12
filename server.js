// Setup empty JS object to act as endpoint for all routes
const projectData = {};
const APIKey = "7ae83410f1ab7bc58c6a3ea0332c4938";

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
const cors = require("cors");
const bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
// Get weather data
app.get("/weather", function (req, res) {
  res.send(projectData);
});

// Post request to add data project data
app.post("/add", function (req, res) {
  const { feeling, temp, date } = req.body;
  projectData.feeling = feeling;
  projectData.date = date;
  projectData.temp = temp;

  console.log("projectData: ", projectData);
  res.send(projectData);
});

// Server start
app.listen("3000", function () {
  console.log("CORS-enabled web server listening on port 3000");
});
