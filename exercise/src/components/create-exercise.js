import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
class CreateExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/user").then((res) => {
      if (res.data.length > 0) {
        this.setState({
          users: res.data.map((user) => {
            return user.username;
          }),
          username: res.data[0].username,
        });
      }
    });
    this.setState({
      users: ["user1", "user2"],
      username: "user1",
    });
  }

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  onChangeDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  onChangeDuration = (e) => {
    this.setState({
      duration: e.target.value,
    });
  };

  onChangeDate = (date) => {
    this.setState({
      date: date,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    axios
      .post("http://localhost:5000/exercise/add", exercise)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    window.location = "/";
    console.log(exercise);
  };

  render() {
    return (
      <div className="container-fluid">
        <h3>Create a new exercise log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="mb-3">
            <label>Username: </label>
            <select className="form-control">
              {this.state.users.map((user) => {
                return <option key={user}>{user}</option>;
              })}
            </select>
          </div>
          <div className="mb-3">
            <label>Description:</label>
            <input
              required
              type="text"
              onChange={this.onChangeDescription}
              className="form-control"
              value={this.state.description}
            ></input>
          </div>
          <div className="mb-3">
            <label>Duration:</label>
            <input
              required
              type="number"
              onChange={this.onChangeDuration}
              className="form-control"
              value={this.state.duration}
            ></input>
          </div>
          <div className="mb-3">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <div className="mt-5">
            <input
              type="submit"
              value="Create Exercise Log"
              className="btn btn-primary float-right"
            ></input>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateExercise;
