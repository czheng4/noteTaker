import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Login from "./components/login";
import NoteTaker from "./components/note-taker";
import SignUp from "./components/sign-up";
import { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      userid: "",
      theme: "",
      login: false,
    };
  }

  login = (user) => {
    this.setState({ login: true, userid: user._id, theme: user.theme });
  };

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/" exact render={(props) => <Login {...props} login={this.login} />} />
            <Route
              path="/notetaker"
              render={(props) => {
                if (!this.state.login) return <Redirect {...props} to="/" />;
                else return <NoteTaker {...props} user={this.state} />;
              }}
            />
            <Route path="/signup" exact component={SignUp} />
            <Route path="*">
              <div className="ml-2 mt-2">Can't find the page</div>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
