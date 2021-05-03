import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import bg from "../imgs/bg.jpg";
import request from "./axios-request";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: "",
    };
  }

  onSignUp = (e) => {
    e.preventDefault();

    const new_user = {
      username: this.state.username,
      password: this.state.password,
    };

    request
      .post("/users/signup", new_user)
      .then((res) => {
        console.log(res.data);
        if ("error" in res.data) {
          console.log(res.data);
          this.setState({ error: res.data.error });
        } else {
          window.location = "/";
        }
      })
      .catch((err) => console.log(err));
  };

  onChangeUsername = (e) => {
    this.setState({ username: e.target.value });
  };

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        <div
          className="w-400 -border bg-dark border-light px-4 py-3 text-white rounded-lg"
          style={{ width: "500px" }}
        >
          <form className="form-group" onSubmit={this.onSignUp}>
            <h3 className="text-center font-weight-bolder">
              Create a new account
            </h3>
            <label className="text-primary">username:</label>
            <input
              type="text"
              className="form-control"
              onChange={this.onChangeUsername}
              required
            ></input>
            <label className="text-primary mt-4">password:</label>
            <input
              type="text"
              className="form-control"
              onChange={this.onChangePassword}
              required
            ></input>
            <div className="mt-4">
              <button className="btn btn-primary">Create</button>
              <span className="text-warning ml-5">{this.state.error}</span>
            </div>
            <div className="mt-4">
              <Link to="/">already have an account?</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
