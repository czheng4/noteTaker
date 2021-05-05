import React from "react";
import { Route, Switch } from "react-router-dom";
import Nav from "./notetaker/nav";
import NoteList from "./notetaker/note-list";
import CreateNote from "./notetaker/create-new-note";

const NoteTaker = (props) => {
  return (
    <div>
      <Nav />
      <Switch>
        <Route
          path="/notetaker"
          exact
          render={(route_props) => <NoteList {...route_props} user={props.user} />}
        />
        <Route
          path="/notetaker/create"
          exact
          render={(route_props) => <CreateNote {...route_props} user={props.user} />}
        />
      </Switch>
    </div>
  );
};

export default NoteTaker;
