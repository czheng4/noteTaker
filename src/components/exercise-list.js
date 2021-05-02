import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

const Exercise = (props) => {
  return (
    <React.Fragment>
      <tr>
        <th>{props.e.username}</th>
        <td>{props.e.description}</td>
        <td>{props.e.duration}</td>
        <td>{props.e.date.substring(0, 10)}</td>
        <td>
          <div>
            <button className="p-0 mr-3 btn btn-link">
              <Link to={`/edit/${props.e._id}`}>Edit</Link>
            </button>
            <button
              className="p-0 m-0 btn btn-link"
              id={props.e._id}
              onClick={props.delete}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    </React.Fragment>
  );
};

class ExerciseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/exercise")
      .then((res) => {
        this.setState({ exercises: res.data });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  onDelete = (e) => {
    console.log(e.target);
    axios
      .delete("http://localhost:5000/exercise/" + e.target.id)
      .then((res) => {
        console.log("successfully delete it");
      })
      .catch((err) => console.log(err));

    const new_exercises = this.state.exercises.filter(
      (exercise) => exercise._id !== e.target.id
    );
    this.setState({ exercises: new_exercises });
  };

  render() {
    return (
      <div className="container-fluid">
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.exercises.map((e) => {
              return <Exercise e={e} key={e._id} delete={this.onDelete} />;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ExerciseList;
