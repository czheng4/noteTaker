import React, { Component } from "react";
import axios from "axios";
class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: this.state.username,
    };
    console.log(user);

    axios
      .post("http://localhost:5000/user/add", user)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    this.setState({
      username: "",
    });
  };

  onChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  render() {
    return (
      <div className="container-fluid">
        <h3>Create a new User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="mt-3">
            <label>Username:</label>
            <input
              type="text"
              className="form-control"
              onChange={this.onChange}
              required
              value={this.state.username}
            ></input>
            <div className="mt-5">
              <input
                type="submit"
                value="Create new user"
                className="btn btn-primary float-right"
              ></input>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateUser;
