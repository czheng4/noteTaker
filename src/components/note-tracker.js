import React, { Component } from "react";

class NoteTracker extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      username: "",
    };
    // this.props.logout();
  }
  render() {
    return <div>123</div>;
  }
}

export default NoteTracker;
