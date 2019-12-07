// console.log(questions);
// console.log(answers);
const { BrowserRouter, Link, Switch, Route, browserHistory } = ReactRouterDOM;

class ChatBox extends React.Component {
  render() {
    return (
      <div>
        <h1>ChatBox Here</h1>
      </div>
    );
  }
}

class Question extends React.Component {
  render() {
    return (
      <div>
        <h3>{this.props.questions[this.props.random]}</h3>
      </div>
    );
  }
}

class Answer extends React.Component {
  render() {
    return (
      <div>
        <h3>{this.props.answers[this.props.random]}</h3>
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
        <div>
          <h1> Cards Against Humanity </h1>
          <Question questions={questions} random={this.state.randomQuestion} />
          <Answer answers={answers} random={this.state.randomAnswer} />
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
