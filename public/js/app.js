const { BrowserRouter, Link, Switch, Route, browserHistory } = ReactRouterDOM;
// var socket = io();
// import io from "socket.io-client";
// let socket = io(`http://192.168.170.239:3000`);
let socket = io();

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      question: "Question?",
      vote: "",
      answers: []
    };
  }
  componentDidMount() {
    // this.props.socket = io("localhost:3000");

    this.props.socket.on("QUESTION", question => {
      this.setState({ question: question });
    });
    this.props.socket.on("CLEAR_RESULT", data => {
      this.setState({ answers: data.submittedAnswer });
    });
    this.props.socket.on("SHOW_RESULT", data => {
      this.setState({ answers: data });
    });
  }
  render() {
    return <h1> {this.state.question} </h1>;
  }
}

class Subheader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
  }

  startRound = ev => {
    ev.preventDefault();
    this.props.socket.emit("START_ROUND", {});
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="card">
        <div className="card-body player-array">
          <div className="card-title player-card">
            <button
              onClick={this.startRound}
              className="btn btn-dark form-control"
            >
              Start Round
            </button>
          </div>
        </div>
      </div>
    );
  }
}

// Chat Box
class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      message: "",
      messages: []
    };
  }

  componentDidMount() {
    // this.props.socket = io("localhost:3000");

    this.props.socket.on("RECEIVE_MESSAGE", data => {
      this.addMessage(data);
    });
    this.props.socket.on("USERNAME", username => {
      this.setState({ username: username });
    });
  }

  addMessage = data => {
    this.setState({ messages: [...this.state.messages, data] });
  };

  sendMessage = ev => {
    ev.preventDefault();
    this.props.socket.emit("SEND_MESSAGE", {
      author: this.state.username,
      message: this.state.message
    });
    this.setState({ message: "" });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <h3>Chat</h3>
          </div>

          <hr />
          <div className="messages">
            {this.state.messages.map(message => {
              return (
                <div>
                  {message.author}: {message.message}
                </div>
              );
            })}
          </div>
        </div>
        <div className="card-footer">
          <input
            type="text"
            placeholder="Message"
            name="message"
            className="form-control"
            value={this.state.message}
            onChange={this.handleChange}
          />
          <br />
          <button
            onClick={this.sendMessage}
            className="btn btn-dark form-control"
          >
            Send
          </button>
        </div>
      </div>
    );
  }
}

// Score Board
class ScoreBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    };
  }
  componentDidMount() {
    // this.props.socket = io("localhost:3000");

    // this.props.socket.on("USERNAME", username => {

    //   this.setState({ username: username });
    // });

    this.props.socket.on("ROOM_PLAYERS", players => {
      console.log("THIS is the client" + players[0].leader);

      this.setState({ players: players });
    });
  }
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <h3>Score Board</h3>
            <div className="scoreboard">
              {this.state.players
                .sort(function(a, b) {
                  return b.score - a.score;
                })
                .map(player => {
                  if (player.leader === true) {
                    return (
                      <div className="bg-white text-dark">
                        {player.name}: {player.score}
                      </div>
                    );
                  } else {
                    return (
                      <div>
                        {player.name}: {player.score}
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Submit Username
class SubmitUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      notification: ""
    };
  }

  componentDidMount() {
    // this.props.socket = io("localhost:3000");
    this.props.socket.on("USERNAME", username => {
      this.setState({ username: username });
    });
    this.props.socket.on("NOTIFICATION", notification => {
      this.setState({ notification: notification });
    });
  }

  sendUsername = ev => {
    ev.preventDefault();
    this.props.socket.emit("SEND_USERNAME", {
      username: this.state.username
    });
  };

  joinGame = room => {
    this.props.socket.emit("JOIN_GAME", {
      room: room
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <nav class="navbar navbar-light bg-light">
          <form class="form-inline">
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="form-control"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <button
              onClick={this.sendUsername}
              className="btn btn-dark form-control"
            >
              Submit Username
            </button>
          </form>
          <p>{this.state.notification}</p>
          <form class="form-inline">
            <Link
              to="/room"
              onClick={() => this.joinGame(1)}
              className="btn btn-dark form-control"
            >
              Join Room 1
            </Link>
          </form>
          <form class="form-inline">
            <Link
              to="/room"
              onClick={() => this.joinGame(2)}
              className="btn btn-dark form-control"
            >
              Join Room 2
            </Link>
          </form>
          <form class="form-inline">
            <Link
              to="/room"
              onClick={() => this.joinGame(3)}
              className="btn btn-dark form-control"
            >
              Join Room 3
            </Link>
          </form>
          <form class="form-inline">
            <Link
              to="/room"
              onClick={() => this.joinGame(4)}
              className="btn btn-dark form-control"
            >
              Join Room 4
            </Link>
          </form>
          <form class="form-inline">
            <Link
              to="/room"
              onClick={() => this.joinGame(5)}
              className="btn btn-dark form-control"
            >
              Join Room 5
            </Link>
          </form>
          <form class="form-inline">
            <Link
              to="/room"
              onClick={() => this.joinGame(6)}
              className="btn btn-dark form-control"
            >
              Join Room 6
            </Link>
          </form>
          <form class="form-inline">
            <Link
              to="/room"
              onClick={() => this.joinGame(7)}
              className="btn btn-dark form-control"
            >
              Join Room 7
            </Link>
          </form>
        </nav>
      </div>
    );
  }
}

// Answer
class GameArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      question: "",
      vote: "",
      answers: [],
      leader: ""
    };
  }
  componentDidMount() {
    // this.props.socket = io("localhost:3000");
    this.props.socket.on("CARDS", players => {
      this.setState({ leader: players.leader });
    });
    this.props.socket.on("QUESTION", question => {
      this.setState({ question: question });
    });
    this.props.socket.on("CLEAR_RESULT", data => {
      this.setState({ answers: data.submittedAnswer });
    });
    this.props.socket.on("SHOW_RESULT", data => {
      this.setState({ answers: data });
    });
  }

  selectCard = answer => {
    this.setState({ vote: answer });
  };

  submitVote = () => {
    this.props.socket.emit("SUBMIT_VOTE", {
      vote: this.state.vote
    });
  };

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h3>Answers: </h3>
          <div className="card-title player-array">
            {this.state.answers.map(answer => {
              return (
                // <div
                //   className={`player-card card-body btn btn-outline-light pointer bold py-3 ${
                //     answer === this.state.vote ? "bg-white text-dark" : ""
                //   }`}
                //   onClick={() => this.selectCard(answer)}
                // >
                //   <p>{answer}</p>
                // </div>
                <div>
                  {this.state.leader ? (
                    <div
                      className={`player-card card-body btn btn-outline-light pointer bold py-3 ${
                        answer === this.state.vote ? "bg-white text-dark" : ""
                      }`}
                      onClick={() => this.selectCard(answer)}
                    >
                      <p>{answer}</p>
                    </div>
                  ) : (
                    <div
                      className={`player-card card-body btn btn-outline-light pointer bold py-3`}
                    >
                      <p>{answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
            {this.state.leader ? (
              <button
                className="btn btn-dark form-control"
                onClick={() => this.submitVote()}
              >
                Submit Vote
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

// Player's Hand
class PlayerHand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      answer: "",
      leader: ""
    };
  }
  componentDidMount() {
    // this.props.socket = io("localhost:3000");

    this.props.socket.on("CARDS", players => {
      this.setState({ cards: players.cards });
      this.setState({ leader: players.leader });
    });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  selectCard = card => {
    this.setState({ answer: card });
  };

  submitCard = () => {
    this.props.socket.emit("SUBMIT_ANSWER", {
      answer: this.state.answer
    });
  };

  render() {
    return (
      <div className="card">
        <div className="card-body player-array">
          <div className="card-title player-card">
            {this.state.cards.map(card => {
              return (
                <div className="card card-card">
                  {this.state.leader ? (
                    <div
                      className={`card-body btn btn-outline-light pointer bold py-3`}
                    >
                      <p className="card-text">{card}</p>
                    </div>
                  ) : (
                    <div
                      className={`card-body btn btn-outline-light pointer bold py-3 ${
                        card === this.state.answer ? "bg-white text-dark" : ""
                      }`}
                      onClick={() => this.selectCard(card)}
                    >
                      <p className="card-text">{card}</p>
                    </div>
                  )}

                  {/* <div
                    className={`card-body btn btn-outline-light pointer bold py-3 ${
                      card === this.state.answer ? "bg-white text-dark" : ""
                    }`}
                  >
                    {this.state.leader ? (
                      <p className="card-text">{card}</p>
                    ) : (
                      <p
                        className="card-text"
                        onClick={() => this.selectCard(card)}
                      >
                        {card}
                      </p>
                    )}
                  </div> */}
                </div>
              );
            })}
          </div>
          {this.state.leader ? (
            ""
          ) : (
            <button
              className="btn btn-dark form-control"
              onClick={() => this.submitCard()}
            >
              Submit Answer
            </button>
          )}
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
      // questions: questions,
      // answers: answers,
      // randomQuestion: Math.floor(
      //   Math.random() * (questions.length - 0) + 0
      // ).toFixed(),
      // randomAnswer: Math.floor(
      //   Math.random() * (answers.length - 0) + 0
      // ).toFixed()
    };
  }
  componentDidMount() {
    socket.on("connection", data => {
      this.setState({ data });
    });
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <h1>CARDS AGAINST HUMANITY</h1>
            <div class="row">
              <div class="col-12">
                <SubmitUser socket={socket} />
              </div>
            </div>
          </Route>
          <Route path="/room">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <Header socket={socket} />
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <ScoreBoard socket={socket} />
                </div>
                <div class="col-4">
                  <GameArea socket={socket} />
                </div>

                <div class="col-4">
                  <ChatBox socket={socket} />
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-12">
                  <Subheader socket={socket} />
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-12">
                  <PlayerHand socket={socket} />
                </div>
              </div>
            </div>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.querySelector(".container"));
