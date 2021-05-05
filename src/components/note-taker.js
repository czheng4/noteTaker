import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Nav from "./notetaker/nav";
import NoteList from "./notetaker/note-list";
import CreateEditNote from "./notetaker/create-edit-note";
import CreateNoteSuccess from "./notetaker/create-note-success";

class NoteTaker extends Component {
  constructor(props) {
    super(props);
    this.state = { noteid: 0 };
  }

  setNoteID = (noteid) => {
    console.log(noteid);
    this.setState({ noteid: noteid });
  };

  render() {
    return (
      <div>
        <Nav />
        <Switch>
          <Route path="/notetaker" exact render={(route_props) => <NoteList {...route_props} user={this.props.user} />} />
          <Route
            path="/notetaker/create"
            exact
            render={(route_props) => <CreateEditNote {...route_props} edit={false} user={this.props.user} setNoteID={this.setNoteID} />}
          />
          <Route path="/notetaker/edit/:id" exact render={(route_props) => <CreateEditNote {...route_props} edit={true} user={this.props.user} />} />
          <Route
            path="/notetaker/create/success"
            exact
            render={(route_props) => <CreateNoteSuccess {...route_props} noteid={this.state.noteid} user={this.props.user} />}
          />
        </Switch>
      </div>
    );
  }
}

export default NoteTaker;
