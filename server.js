// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const db = mongoose.connection;
const bodyParser = require("body-parser");
require("dotenv").config();
let numUsers = 0;

var http = require("http").createServer(app);
var io = require("socket.io")(http);

//require the http module
// const http = require("http").Server(app);

// require the socket.io module
// const io = require("socket.io");

// Environment Variables
const mongoURI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3004;

// Connect to Mongo
mongoose.connect(mongoURI, { useNewUrlParser: true }, () =>
  console.log("MongoDB connection established:", mongoURI)
);

// Error / Disconnection
db.on("error", err => console.log(err.message + " is Mongod not running?"));
db.on("disconnected", () => console.log("mongo disconnected"));

// Middleware
app.use(express.urlencoded({ extended: false })); // extended: false - does not allow nested objects in query strings
app.use(express.json()); // returns middleware that only parses JSON
app.use(bodyParser.json()); // bodyparser middleware

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

//integrating socketio
// socket = io(http);

// Routes
const todosController = require("./controllers/todos.js");
app.use("/todos", todosController);

app.get("/seedq", (req, res) => {
  question.create(
    {
      description:
        "Action stations! Action stations! Set condition one throughout the fleet and brace for ______!"
    },
    {
      description:
        "In the final round of this year's Omegathon, Omeganauts must face off in a game of ______."
    },
    {
      description:
        "______ is the universe’s way of saying I need to stay away from ______."
    },
    (error, data) => {
      res.redirect("/");
    }
  );
});

// this will catch any route that doesn't exist
app.get("*", (req, res) => {
  res.status(404).json("Sorry, page not found");
});

io.on("connection", function(socket) {
  numUsers++;
  console.log("Users online : " + numUsers);
  socket.on("disconnect", function() {
    numUsers--;
    console.log("Users online : " + numUsers);
  });
});

// app.listen(PORT, () => {
//   console.log("Let's get things done on port", PORT);
// });

http.listen(3000, function() {
  console.log("listening on *:3000");
});
