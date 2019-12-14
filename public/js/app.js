const { BrowserRouter, Link, Switch, Route, browserHistory } = ReactRouterDOM;
// var socket = io();
// import io from "socket.io-client";
let socket = io(`http://localhost:3000`);

class Header extends React.Component {
  render() {
    return <h1> Cards Against Humanity </h1>;
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
    console.log("ChatBox-socket:", this.props.socket);
    this.props.socket.on("RECEIVE_MESSAGE", data => {
      this.addMessage(data);
    });
  }

  addMessage = data => {
    console.log(data);
    this.setState({ messages: [...this.state.messages, data] });
    console.log(this.state.messages);
  };

  sendMessage = ev => {
    ev.preventDefault();
    this.props.socket.emit("SEND_MESSAGE", {
      author: this.state.username,
      message: this.state.message
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className="card-title">Global Chat</div>

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
            placeholder="Username"
            name="username"
            className="form-control"
            value={this.state.username}
            onChange={this.handleChange}
          />

          <br />
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
            className="btn btn-primary form-control"
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
    console.log("ScoreBoard-socket:", this.props.socket);
    // this.props.socket.on("USERNAME", username => {
    //   console.log("username is " + username);
    //   this.setState({ username: username });
    // });

    this.props.socket.on("ROOM_PLAYERS", players => {
      console.log("username is " + players);

      this.setState({ players: players });
    });
  }
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <p>Score Board</p>
            {this.state.players.map(player => {
              return (
                <div>
                  {player.name}: {player.score}
                </div>
              );
            })}
            {/* to move this out of scoreboard eventually */}
            <SubmitUser socket={this.props.socket} />
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
      username: ""
    };
  }

  componentDidMount() {
    // this.props.socket = io("localhost:3000");
    this.props.socket.on("USERNAME", username => {
      console.log("SubmitUser-username is " + username);
      this.setState({ username: username });
    });
  }

  sendUsername = ev => {
    ev.preventDefault();
    this.props.socket.emit("SEND_USERNAME", {
      username: this.state.username
    });
  };

  joinGame = ev => {
    ev.preventDefault();
    this.props.socket.emit("JOIN_GAME", {});
  };

  startRound = ev => {
    ev.preventDefault();
    this.props.socket.emit("START_ROUND", {});
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
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
          className="btn btn-primary form-control"
        >
          Submit Username
        </button>
        <button
          onClick={this.joinGame}
          className="btn btn-primary form-control"
        >
          Join Game
        </button>
        <button
          onClick={this.startRound}
          className="btn btn-primary form-control"
        >
          Start Round
        </button>
      </div>
    );
  }
}

// Game Area
class GameArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      question: "",
      answer: []
    };
  }
  componentDidMount() {
    // this.props.socket = io("localhost:3000");
    console.log("GameArea-socket:", this.props.socket);
    this.props.socket.on("QUESTION", question => {
      this.setState({ question: question });
    });
    this.props.socket.on("ANSWER", answer => {
      this.setState({ answer: answer });
    });
  }
  sendUsername = ev => {
    ev.preventDefault();
    this.props.socket.emit("SEND_USERNAME", {
      username: this.state.username
    });
  };

  answer = ev => {
    ev.preventDefault();
    this.props.socket.emit("ANSWER", {
      numCards: this.state.numCards
    });
  };

  render() {
    return (
      <div class="row">
        <div class="col-8">
          <div className="card">
            <div className="card-body">
              <div className="card-title">
                <h3>Question: </h3>
                <p>{this.state.question}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <ScoreBoard socket={this.props.socket} />
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
      cards: []
    };
  }
  componentDidMount() {
    // this.props.socket = io("localhost:3000");
    console.log("PlayerHand-socket:", this.props.socket);
    this.props.socket.on("CARDS", cards => {
      this.setState({ cards: cards });
    });
  }

  // answer = ev => {
  //   ev.preventDefault();
  //   this.props.socket.emit("ANSWER", {

  //     numCards: this.state.numCards
  //   });
  // };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <ul>
              {this.state.cards.map(card => {
                return <li>{card}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      questions: questions,
      answers: answers,
      randomQuestion: Math.floor(
        Math.random() * (questions.length - 0) + 0
      ).toFixed(),
      randomAnswer: Math.floor(
        Math.random() * (answers.length - 0) + 0
      ).toFixed()
    };
  }
  componentDidMount() {
    socket.on("connection", data => {
      console.log("hello");
      this.setState({ data });
    });
  }
  render() {
    return (
      <BrowserRouter>
        <div class="container">
          <div class="row">
            <div class="col-12">
              <Header />
            </div>
          </div>
          <div class="row">
            <div class="col-8">
              <GameArea
                questions={questions}
                random={this.state.randomQuestion}
                socket={socket}
              />
            </div>

            <div class="col-4">
              <ChatBox socket={socket} />
            </div>
          </div>

          <hr />

          <div class="row">
            <div class="col-12">
              <PlayerHand
                answers={answers}
                random={this.state.randomAnswer}
                socket={socket}
              />
            </div>
          </div>

          <hr />

          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/second">Second</Link>
            </li>
          </ul>
          <hr />

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/second">
              <Second />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.querySelector(".container"));
