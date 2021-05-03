import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login";
import NoteTracker from "./components/note-tracker";
import SignUp from "./components/sign-up";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/notetracker" component={NoteTracker} />
    </Router>
  );
}

export default App;
