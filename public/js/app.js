// console.log(questions);
// console.log(answers);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: questions,
      answers: answers,
      random: Math.floor(Math.random() * (questions.length - 0) + 0).toFixed()
    };
  }
  render() {
    console.log(this.state.random);
    return (
      <div>
        <h1> Cards Against Humanity </h1>
        {/* <button onClick={this.randomNumber.bind(this)}>Questions</button> */}
        <h3>{this.state.questions[this.state.random]}</h3>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector(".container"));
