const { BrowserRouter, Link, Switch, Route, browserHistory } = ReactRouterDOM;
// var socket = io();
// import io from "socket.io-client";

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
      messages: [],
      question: "",
      answer: [],
      numCards: 0
    };
  }

  componentDidMount() {
    this.socket = io("localhost:3000");
    console.log("socket:", this.socket);
    this.socket.on("RECEIVE_MESSAGE", data => {
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

    this.socket.emit("SEND_MESSAGE", {
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
    this.socket = io("localhost:3000");
    console.log("socket:", this.socket);
    // this.socket.on("USERNAME", username => {
    //   console.log("username is " + username);
    //   this.setState({ username: username });
    // });
    this.socket.on("ROOM_PLAYERS ", players => {
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
            <SubmitUser />
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
    this.socket = io("localhost:3000");
    this.socket.on("USERNAME", username => {
      console.log("username is " + username);
      this.setState({ username: username });
    });
  }

  sendUsername = ev => {
    ev.preventDefault();
    this.socket.emit("SEND_USERNAME", {
      username: this.state.username
    });
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
    this.socket = io("localhost:3000");
    console.log("socket:", this.socket);
    this.socket.on("QUESTION", question => {
      this.setState({ question: question });
    });
    this.socket.on("ANSWER", answer => {
      this.setState({ answer: answer });
    });
  }
  sendUsername = ev => {
    ev.preventDefault();
    this.socket.emit("SEND_USERNAME", {
      username: this.state.username
    });
  };

  answer = ev => {
    ev.preventDefault();
    this.socket.emit("ANSWER", {
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
                <p>{this.props.questions[this.props.random]}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <ScoreBoard />
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
      username: "",
      answer: [],
      numCards: 0
    };
  }
  componentDidMount() {
    this.socket = io("localhost:3000");
    this.socket.on("USERNAME", username => {
      console.log("username is " + username);
      this.setState({ username: username });
    });
    this.socket.on("ANSWER", answer => {
      this.setState({ answer: answer });
    });
  }

  sendUsername = ev => {
    ev.preventDefault();
    this.socket.emit("SEND_USERNAME", {
      username: this.state.username
    });
  };

  answer = ev => {
    ev.preventDefault();
    this.socket.emit("ANSWER", {
      numCards: this.state.numCards
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            {this.props.answers[this.props.random]}
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
              />
            </div>

            <div class="col-4">
              <ChatBox />
            </div>
          </div>

          <hr />

          <div class="row">
            <div class="col-12">
              <PlayerHand answers={answers} random={this.state.randomAnswer} />
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
