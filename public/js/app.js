const { BrowserRouter, Link, Switch, Route, browserHistory } = ReactRouterDOM;

class Header extends React.Component {
  render() {
    return <h1> Cards Against Humanity </h1>;
  }
}

class ChatBox extends React.Component {
  render() {
    return (
      <div>
        <h3>ChatBox Here</h3>
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
    console.log(this.state.random);
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
              <ChatBox />
            </div>
          </div>
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
