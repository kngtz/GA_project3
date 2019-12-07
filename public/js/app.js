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
      <div>
        <h1> Cards Against Humanity </h1>
        <Question questions={questions} random={this.state.randomQuestion} />
        <Player answers={answers} random={this.state.randomAnswer} />
        <ChatBox />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector(".container"));
