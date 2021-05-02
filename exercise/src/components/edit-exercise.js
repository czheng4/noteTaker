import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
class EditExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/exercise/${this.props.match.params.id}`)
      .then((res) => {
        const data = res.data;
        this.setState({
          id: data._id,
          username: data.username,
          description: data.description,
          duration: data.duration,
          date: Date.parse(data.date),
        });
        console.log(data);
      })
      .catch((err) => console.log(err));
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
      .post(`http://localhost:5000/exercise/update/${this.state.id}`, exercise)
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
            <input
              className="form-control"
              value={this.state.username}
              readOnly
            ></input>
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
              value="Edit Exercise Log"
              className="btn btn-primary float-right"
            ></input>
          </div>
        </form>
      </div>
    );
  }
}

export default EditExercise;
