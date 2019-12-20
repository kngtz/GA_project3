// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const db = mongoose.connection;
const bodyParser = require("body-parser");
const questions = require("./data/questions.js");
const answers = require("./data/answers.js");
require("dotenv").config();

var http = require("http").createServer(app);
var io = require("socket.io")(http);

// Environment Variables
const mongoURI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 8083;

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

var shuffle = function(array) {
  var currentIndex = array.length;
  var temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

//initialise variables
let numUsers = 0;
let userArray = [];
let nameArray = [];

// let submittedAnswer = [];
// let submittedString = [];
// let submittedVote = [];
// let leaderCounter = 0;
// let flowCheck = 0;
// let anonymousCounter = 1;
// let room = "";

// var roo[roomID] = {
//   Name: "Room 1",
//   players: [],
//   questions: questions,
//   answers: answers
// };
class GRoom {
  constructor(name, answers, questions) {
    this.name = name;
    this.players = [];
    this.questions = questions;
    this.answers = answers;
    this.submittedAnswer = [];
    this.submittedString = [];
    this.submittedVote = [];
    this.leaderCounter = 0;
    this.flowCheck = 0;
    this.anonymousCounter = 1;
    this.room = "";
  }
}
var roo = [];
for (i = 0; i < 10; i++) {
  shuffle(answers);

  shuffle(questions);
  roo[i] = new GRoom("Room" + i, [...answers], [...questions]);
}

console.log(roo);

// Routes
app.get("/killgame", (req, res) => {
  shuffle(answers);
  shuffle(questions);
  numUsers = 0;
  userArray = [];
  nameArray = [];
  submittedAnswer = [];
  submittedString = [];
  submittedVote = [];
  leaderCounter = 0;
  flowCheck = 0;
  anonymousCounter = 1;

  roo[roomID] = {
    Name: "Room 1",
    players: [],
    questions: questions,
    answers: answers
  };
  res.redirect("/");
});

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
  userArray.push(socket.id);

  io.clients((error, clients) => {
    if (error) throw error;
  });
  // CHAT BOX FUNCTION ===============================================================================
  socket.on("SEND_MESSAGE", function(data) {
    let rooms = Object.keys(socket.rooms);

    io.to(rooms[1]).emit("RECEIVE_MESSAGE", data);
    // io.to(userArray[3]).emit("RECEIVE_MESSAGE", data); // private messaging proof of concept
  });

  // CHAT BOX FUNCTION ===============================================================================

  socket.on("SEND_USERNAME", function(data) {
    if (!socket.username) {
      if (nameArray.findIndex(id => id == data.username) < 0) {
        console.log("entered send username");
        socket.username = data.username;
        nameArray.push(data.username);
        socket.emit("USERNAME", socket.username);
        console.log(socket.username);
      } else {
        socket.emit("NOTIFICATION", "Username is taken");
      }
    } else {
      socket.emit("NOTIFICATION", "You already have a username");
    }

    //socket.emit("USERNAME", data.username);
  });
  socket.on("JOIN_GAME", function(data) {
    room = "Room" + data.room;
    console.log(data.room);

    socket.join(room);
    let roomID = roo.findIndex(p => p.name === room);
    console.log(roomID);
    let rooms = Object.keys(socket.rooms);

    var index = roo[roomID].players.findIndex(
      p => p.connectionSocket == socket.id
    );

    if (!socket.username) {
      socket.username = "anonymous" + roo[roomID].anonymousCounter;
      roo[roomID].anonymousCounter++;
      socket.emit("USERNAME", socket.username);
    } else {
      socket.emit("USERNAME", socket.username);
    }

    if (roo[roomID].players.length === 0) {
      roo[roomID].players.push({
        connectionSocket: socket.id,
        name: socket.username,
        cards: [],
        score: 0,
        leader: false
      });

      io.to(room).emit("ROOM_PLAYERS", roo[roomID].players);
    } else if (index < 0) {
      roo[roomID].players.push({
        connectionSocket: socket.id,
        name: socket.username,
        cards: [],
        score: 0,
        leader: false
      });

      io.to(room).emit("ROOM_PLAYERS", roo[roomID].players);
    } else {
    }

    // if (socket.id !=== ){
  });
  socket.on("START_ROUND", function(data) {
    let rooms = Object.keys(socket.rooms);
    let roomID = roo.findIndex(p => p.name === rooms[1]);

    socket.emit("NOTIFICATION", "");
    if (roo[roomID].flowCheck === 0) {
      roo[roomID].flowCheck++;

      for (i = 0; i < roo[roomID].players.length; i++) {
        roo[roomID].players[i].leader = false;
      }
      roo[roomID].players[roo[roomID].leaderCounter].leader = true;
      io.to(rooms).emit("ROOM_PLAYERS", roo[roomID].players);
      if (roo[roomID].leaderCounter === roo[roomID].players.length - 1) {
        roo[roomID].leaderCounter = 0;
      } else {
        roo[roomID].leaderCounter++;
      }

      roo[roomID].submittedAnswer = [];
      roo[roomID].submittedString = [];
      io.to(rooms[1]).emit("CLEAR_RESULT", {
        submittedAnswer: roo[roomID].submittedAnswer,
        players: roo[roomID].players
      });

      io.to(rooms[1]).emit("QUESTION", roo[roomID].questions[0].text);
      roo[roomID].questions.splice(0, 1);

      for (i = 0; i < roo[roomID].players.length; i++) {
        for (n = roo[roomID].players[i].cards.length; n < 7; n++) {
          roo[roomID].players[i].cards.push(roo[roomID].answers[0]);
          roo[roomID].answers.splice(0, 1);
        }
        io.to(roo[roomID].players[i].connectionSocket).emit(
          "CARDS",

          {
            cards: roo[roomID].players[i].cards,
            leader: roo[roomID].players[i].leader
          }
        );
      }
    }
  });

  socket.on("SUBMIT_ANSWER", function(data) {
    let rooms = Object.keys(socket.rooms);
    let roomID = roo.findIndex(p => p.name === rooms[1]);
    roo[roomID].submittedAnswer.push({
      socketval: socket.id,
      answer: data.answer
    });
    roo[roomID].submittedString.push(data.answer);

    for (i = 0; i < roo[roomID].players.length; i++) {
      if (socket.id === roo[roomID].players[i].connectionSocket) {
        roo[roomID].players[i].cards.splice(
          roo[roomID].players[i].cards.findIndex(id => id === data.answer),
          1
        );
      }
      io.to(roo[roomID].players[i].connectionSocket).emit("CARDS", {
        cards: roo[roomID].players[i].cards,
        leader: roo[roomID].players[i].leader
      });
    }

    if (roo[roomID].submittedAnswer.length == roo[roomID].players.length - 1) {
      io.to(rooms[1]).emit("SHOW_RESULT", roo[roomID].submittedString);
    } else {
    }
  });
  socket.on("SUBMIT_VOTE", function(data) {
    let rooms = Object.keys(socket.rooms);
    let roomID = roo.findIndex(p => p.name === rooms[1]);
    for (i = 0; i < roo[roomID].submittedAnswer.length; i++) {
      if (roo[roomID].submittedAnswer[i].answer === data.vote) {
        for (n = 0; n < roo[roomID].players.length; n++) {
          if (
            roo[roomID].submittedAnswer[i].socketval ===
            roo[roomID].players[n].connectionSocket
          ) {
            roo[roomID].players[n].score++;
          }
        }
      }
    }

    io.to(rooms[1]).emit("ROOM_PLAYERS", roo[roomID].players);
    roo[roomID].flowCheck = 0;
  });
  socket.on("disconnect", function() {
    let rooms = Object.keys(socket.rooms);
    let roomID = roo.findIndex(p => p.name === rooms[1]);
    numUsers--;

    userArray.splice(
      userArray.findIndex(id => id === socket.id),
      1
    );

    if (
      roo[roomID].players.findIndex(id => id.connectionSocket == socket.id) >= 0
    ) {
      roo[roomID].players.splice(
        roo[roomID].players.findIndex(id => id.connectionSocket == socket.id),
        1
      );
    }
    io.to(rooms[1]).emit("ROOM_PLAYERS", roo[roomID].players);
  });
});

http.listen(PORT, function() {
  console.log("listening on");
});
