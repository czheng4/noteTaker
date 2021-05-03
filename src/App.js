import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login";
import NoteTracker from "./components/note-tracker";
import SignUp from "./components/sign-up";
import { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      theme: "",
      login: false,
    };
  }

  login = (user) => {
    this.setState({ login: true, username: user.username, theme: user.theme });
  };

  logout = () => {
    console.log("logout");
    this.setState({ login: false });
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => <Login {...props} login={this.login} />}
          />
          <Route
            path="/notetracker"
            exact
            render={(props) => {
              if (!this.state.login) return <Redirect to="/" />;
              else return <NoteTracker user={this.state} />;
            }}
          />
          <Route path="/signup" exact component={SignUp} />
          <Route path="*">
            <div className="ml-2 mt-2">Can't find the page</div>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
