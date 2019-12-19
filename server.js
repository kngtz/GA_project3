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
const PORT = process.env.PORT || 3000;

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
shuffle(answers);
shuffle(questions);

//initialise variables
let numUsers = 0;
let userArray = [];
let nameArray = [];
let submittedAnswer = [];
let submittedString = [];
let submittedVote = [];
let leaderCounter = 0;
let flowCheck = 0;
let anonymousCounter = 1;

var gameRoom = {
  Name: "Room 1",
  players: [],
  questions: questions,
  answers: answers
};

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

  gameRoom = {
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
  console.log("this is the socket username" + socket.username);
  numUsers++;
  userArray.push(socket.id);

  console.log(socket.id + " connected");
  console.log("Users online : " + numUsers);
  console.log("the array is" + userArray);

  io.clients((error, clients) => {
    if (error) throw error;
    console.log(clients);
  });
  // CHAT BOX FUNCTION ===============================================================================
  socket.on("SEND_MESSAGE", function(data) {
    console.log(socket.id + ": SENT MESSAGE - " + data);

    io.emit("RECEIVE_MESSAGE", data);
    // io.to(userArray[3]).emit("RECEIVE_MESSAGE", data); // private messaging proof of concept
  });

  // CHAT BOX FUNCTION ===============================================================================

  socket.on("SEND_USERNAME", function(data) {
    if (!socket.username) {
      if (nameArray.findIndex(id => id == data.username) < 0) {
        socket.username = data.username;
        nameArray.push(data.username);
        socket.emit("USERNAME", data.username);
      } else {
        socket.emit("NOTIFICATION", "Username is taken");
      }
    } else {
      socket.emit("NOTIFICATION", "You already have a username");
    }

    //socket.emit("USERNAME", data.username);
  });
  socket.on("JOIN_GAME", function(data) {
    var index = gameRoom.players.findIndex(
      p => p.connectionSocket == socket.id
    );

    if (!socket.username) {
      socket.username = "anonymous" + anonymousCounter;
      anonymousCounter++;
      socket.emit("USERNAME", socket.username);
      socket.emit("NOTIFICATION", "your username is " + socket.username);
    }

    if (gameRoom.players.length === 0) {
      gameRoom.players.push({
        connectionSocket: socket.id,
        name: socket.username,
        cards: [],
        score: 0,
        leader: false
      });

      io.emit("ROOM_PLAYERS", gameRoom.players);
    } else if (index < 0) {
      gameRoom.players.push({
        connectionSocket: socket.id,
        name: socket.username,
        cards: [],
        score: 0,
        leader: false
      });

      io.emit("ROOM_PLAYERS", gameRoom.players);
    } else {
      console.log("player is already in the game");
    }

    // if (socket.id !=== ){
  });
  socket.on("START_ROUND", function(data) {
    socket.emit("NOTIFICATION", "");
    if (flowCheck === 0) {
      console.log("first" + flowCheck);
      flowCheck++;
      console.log("second" + flowCheck);
      for (i = 0; i < gameRoom.players.length; i++) {
        gameRoom.players[i].leader = false;
      }
      gameRoom.players[leaderCounter].leader = true;
      io.emit("ROOM_PLAYERS", gameRoom.players);
      if (leaderCounter === gameRoom.players.length - 1) {
        leaderCounter = 0;
        console.log("LEADERCOUNTER = " + leaderCounter);
      } else {
        leaderCounter++;
        console.log("leadercounter = " + leaderCounter);
      }

      submittedAnswer = [];
      submittedString = [];
      io.emit("CLEAR_RESULT", {
        submittedAnswer: submittedAnswer,
        players: gameRoom.players
      });

      io.emit("QUESTION", gameRoom.questions[0].text);
      gameRoom.questions.splice(0, 1);

      for (i = 0; i < gameRoom.players.length; i++) {
        for (n = gameRoom.players[i].cards.length; n < 7; n++) {
          gameRoom.players[i].cards.push(gameRoom.answers[0]);
          gameRoom.answers.splice(0, 1);
        }
        io.to(gameRoom.players[i].connectionSocket).emit(
          "CARDS",
          // gameRoom.players[i]
          {
            cards: gameRoom.players[i].cards,
            leader: gameRoom.players[i].leader
          }
        );
      }
    }
  });

  socket.on("SUBMIT_ANSWER", function(data) {
    console.log(socket.id + ": SUBMIT ANSWER - " + data.answer);

    submittedAnswer.push({ socketval: socket.id, answer: data.answer });
    submittedString.push(data.answer);

    for (i = 0; i < gameRoom.players.length; i++) {
      if (socket.id === gameRoom.players[i].connectionSocket) {
        gameRoom.players[i].cards.splice(
          gameRoom.players[i].cards.findIndex(id => id === data.answer),
          1
        );
      }
      io.to(gameRoom.players[i].connectionSocket).emit("CARDS", {
        cards: gameRoom.players[i].cards,
        leader: gameRoom.players[i].leader
      });
    }

    if (submittedAnswer.length == gameRoom.players.length - 1) {
      console.log("all players submitted");
      console.log(submittedString);

      io.emit("SHOW_RESULT", submittedString);
    } else {
      console.log("still awaiting answers");
    }
  });
  socket.on("SUBMIT_VOTE", function(data) {
    console.log(socket.id + ": SUBMIT VOTE - " + data.vote);

    for (i = 0; i < submittedAnswer.length; i++) {
      console.log("first for");
      if (submittedAnswer[i].answer === data.vote) {
        console.log("first if");
        for (n = 0; n < gameRoom.players.length; n++) {
          console.log("second for");
          if (
            submittedAnswer[i].socketval ===
            gameRoom.players[n].connectionSocket
          ) {
            console.log("second if");
            gameRoom.players[n].score++;
            console.log(gameRoom.players[n]);
          }
        }
      }
    }

    io.emit("ROOM_PLAYERS", gameRoom.players);
    flowCheck = 0;
    console.log("second" + flowCheck);
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

http.listen(PORT, function() {
  console.log("listening on");
});
