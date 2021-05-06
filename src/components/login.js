import React, { Component } from "react";
import { Link } from "react-router-dom";
import bg from "../imgs/bg.jpg";
import request from "./axios-request";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: "",
      login: false,
    };
  }

  onLogin = (e) => {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    request
      .get(`/users/signin/${username}/${password}`)
      .then((res) => {
        if ("error" in res.data) {
          this.setState({ error: res.data.error });
        } else {
          this.props.login(res.data);
          this.props.history.push("/notetaker");
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
        <div className="border bg-dark border-light px-4 py-3 text-white rounded-lg mb-5" style={{ width: "500px", opacity: 0.85 }}>
          <form className="form-group" onSubmit={this.onLogin}>
            <h3 className="text-center font-weight-bolder">Note Taker Login</h3>
            <label className="text-primary">username:</label>
            <input type="text" className="form-control" onChange={this.onChangeUsername} required></input>
            <label className="text-primary mt-4">password:</label>
            <input type="text" className="form-control" onChange={this.onChangePassword} required></input>
            <div className="mt-4">
              <button className="btn btn-primary">Login</button>
              <span className="text-warning ml-5">{this.state.error}</span>
            </div>
            <div className="mt-4">
              <Link to="/signup">create a new account</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
