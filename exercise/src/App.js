import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/navbar";
import ExerciseList from "./components/exercise-list";
import CreateExercise from "./components/create-exercise";
import CreateUser from "./components/create-user";
import EditExercise from "./components/edit-exercise";

function App() {
  return (
    <Router>
      <NavBar />
      <br />
      <Route path="/" exact component={ExerciseList}></Route>
      <Route path="/user" component={CreateUser}></Route>
      <Route
        path="/create"
        component={() => <CreateExercise isCreate />}
      ></Route>
      <Route path="/edit/:id" component={EditExercise}></Route>
    </Router>
  );
}

export default App;
