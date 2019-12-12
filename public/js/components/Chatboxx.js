class Chatboxx extends React.Component {
  render() {
    return (
      <div>
        <p>Chatboxx Component</p>
      </div>
    );
  }
}

// class ChatBox extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       username: "",
//       message: "",
//       messages: [],
//       question: "",
//       answer: ""
//     };
//   }

//   componentDidMount() {
//     this.socket = io("localhost:3000");
//     console.log("socket:", this.socket);
//     this.socket.on("RECEIVE_MESSAGE", data => {
//       this.addMessage(data);
//     });
//     this.socket.on("QUESTION", question => {
//       this.setState({ question: question });
//     });
//     this.socket.on("ANSWER", answer => {
//       this.setState({ answer: answer });
//     });
//   }

//   addMessage = data => {
//     console.log(data);
//     this.setState({ messages: [...this.state.messages, data] });
//     console.log(this.state.messages);
//   };

//   sendMessage = ev => {
//     ev.preventDefault();

//     this.socket.emit("SEND_MESSAGE", {
//       author: this.state.username,
//       message: this.state.message
//     });
//   };

//   joinGame = ev => {
//     ev.preventDefault();

//     this.socket.emit("JOIN_GAME", {
//       author: this.state.username,
//       message: this.state.message
//     });
//   };
//   answer = ev => {
//     ev.preventDefault();

//     this.socket.emit("ANSWER", {
//       author: this.state.username,
//       message: this.state.message
//     });
//   };

//   handleChange = event => {
//     this.setState({ [event.target.name]: event.target.value });
//   };

//   render() {
//     return (
//       <div className="container">
//         <div className="row">
//           <div className="col-4">
//             <div className="card">
//               <div className="card-body">
//                 <div className="card-title">
//                   {this.state.question}:{this.state.answer}
//                 </div>
//                 <hr />
//                 <div className="messages">
//                   {this.state.messages.map(message => {
//                     return (
//                       <div>
//                         {message.author}: {message.message}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//               <div className="card-footer">
//                 <input
//                   type="text"
//                   placeholder="Username"
//                   name="username"
//                   className="form-control"
//                   value={this.state.username}
//                   onChange={this.handleChange}
//                 />
//                 <br />
//                 <input
//                   type="text"
//                   placeholder="Message"
//                   name="message"
//                   className="form-control"
//                   value={this.state.message}
//                   onChange={this.handleChange}
//                 />
//                 <br />
//                 <button
//                   onClick={this.sendMessage}
//                   className="btn btn-primary form-control"
//                 >
//                   Send
//                 </button>
//                 <button
//                   onClick={this.joinGame}
//                   className="btn btn-primary form-control"
//                 >
//                   Join Game
//                 </button>
//                 <button
//                   onClick={this.answer}
//                   className="btn btn-primary form-control"
//                 >
//                   Answers
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
