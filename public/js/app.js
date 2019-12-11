const { BrowserRouter, Link, Switch, Route, browserHistory } = ReactRouterDOM;
// var socket = io();
// import io from "socket.io-client";

class Header extends React.Component {
  render() {
    return <h1> Cards Against Humanity </h1>;
  }
}

class ChatBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      message: "",
      messages: [],
      question: "",
      answer: ""
    };
  }

  componentDidMount() {
    this.socket = io("localhost:3000");
    console.log("socket:", this.socket);
    this.socket.on("RECEIVE_MESSAGE", data => {
      this.addMessage(data);
    });
    this.socket.on("QUESTION", question => {
      this.setState({ question: question });
    });
    this.socket.on("ANSWER", answer => {
      this.setState({ answer: answer });
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

  joinGame = ev => {
    ev.preventDefault();

    this.socket.emit("JOIN_GAME", {
      author: this.state.username,
      message: this.state.message
    });
  };
  answer = ev => {
    ev.preventDefault();

    this.socket.emit("ANSWER", {
      author: this.state.username,
      message: this.state.message
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <div className="card-title">
                  {this.state.question}:{this.state.answer}
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
                <button
                  onClick={this.joinGame}
                  className="btn btn-primary form-control"
                >
                  Join Game
                </button>
                <button
                  onClick={this.answer}
                  className="btn btn-primary form-control"
                >
                  Answers
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Question extends React.Component {
  render() {
    return (
      <div>
        <h3>Question: </h3>
        <p>{this.props.questions[this.props.random]}</p>
      </div>
    );
  }
}

class Answer extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.answers[this.props.random]}</p>
      </div>
    );
  }
}

class Player extends React.Component {
  render() {
    return (
      <div>
        <Answer answers={this.props.answers} random={this.props.random} />
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
              <Question
                questions={questions}
                random={this.state.randomQuestion}
              />
              <Player answers={answers} random={this.state.randomAnswer} />
            </div>

            <div class="col-4">
              <h1></h1>
            </div>
          </div>
          <ChatBox />
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
