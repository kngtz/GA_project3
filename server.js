// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const db = mongoose.connection;
const bodyParser = require("body-parser");

require("dotenv").config();
const Question = require("./models/questions");

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

//initialise variables
let numUsers = 0;
let userArray = [];
var gameRoom = {
  Name: "Room 1",
  Players: [{ Name: "Tom", Cards: ["a", "b", "c"] }],
  Questions: [
    "Action stations! Action stations! Set condition one throughout the fleet and brace for ______!",
    "In the final round of this year's Omegathon, Omeganauts must face off in a game of ______.",
    "______ is the universe’s way of saying I need to stay away from ______.",
    "______? Fuggedaboutit!",
    "______. Changes. Everything.",
    "5, 4, 3, 2, 1, ______!",
    "Ain’t it nifty?! Bob and Barb hit 50, so get off your ass and raise a glass to 50 years of ______.",
    "Coming to Red Lobster this month, ______.",
    "Here’s a little something I learned in business school: The customer is always ______."
  ],
  answers: [
    "Getting inside the Horadric Cube with a hot babe and pressing the transmute button.",
    "Loading from a previous save.",
    "Punching a tree to gather wood.",
    "Sharpening a foam broadsword on a foam whetstone.",
    "Spending the year's insulin budget on Warhammer 40k figurines.",
    "The depression that ensues after catching 'em all.",
    "The rocket launcher.",
    "Violating the First Law of Robotics."
  ]
};

// Routes
const todosController = require("./controllers/todos.js");
app.use("/todos", todosController);

app.get("/seedq", (req, res) => {
  Question.create(
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

// io.on("connection", function(socket) {
//   socket.on("chat message", function(msg) {
//     io.emit("chat message", msg);
//   });
// });

io.on("connection", function(socket) {
  numUsers++;
  userArray.push(socket.id);
  console.log(socket.id + " connected");
  console.log("Users online : " + numUsers);
  console.log("the array is" + userArray);

  io.clients((error, clients) => {
    if (error) throw error;
    console.log(clients);
  });
  socket.on("SEND_MESSAGE", function(data) {
    console.log(socket.id + ": SENT MESSAGE - " + data);
    console.log(userArray[3]);
    io.emit("RECEIVE_MESSAGE", data); // private messaging proof of concept
  });
  socket.on("JOIN_GAME", function(data) {
    console.log(socket.id + ": JOIN GAME - " + data);
    io.to(socket.id).emit("QUESTION", gameRoom.Questions[0]);
  });
  socket.on("ANSWER", function(data) {
    console.log(socket.id + ": ANSWER - " + data);
    io.to(socket.id).emit("ANSWER", gameRoom.answers[0]);
  });
  socket.on("disconnect", function() {
    numUsers--;
    console.log(socket.id + " disconnected");
    userArray.splice(
      userArray.findIndex(id => id === socket.id),
      1
    );
    console.log("Users online : " + numUsers);
  });
});

// io.on("connection", socket => {
//   socket.join("room 237", () => {
//     numUsers++;
//     console.log("Users online : " + numUsers);
//     let rooms = Object.keys(socket.rooms);
//     console.log(rooms); // [ <socket.id>, 'room 237' ]
//     socket.on("disconnect", function() {
//       numUsers--;
//       console.log("Users online : " + numUsers);
//     });
//   });
// });

// var numclients = io.sockets.adapter.rooms["room 237"];
// console.log(numclients.length);

// app.listen(PORT, () => {
//   console.log("Let's get things done on port", PORT);
// });

http.listen(3000, function() {
  console.log("listening on *:3000");
});
