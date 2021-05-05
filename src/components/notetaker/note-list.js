import React, { Component } from "react";
import request from "../axios-request";
import "bootstrap/dist/js/bootstrap.bundle.js";
class NoteList extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      notes: {} /* key is the catergory, values are all notes belong to that category */,
      category: "All categories",
    };
  }
  componentDidMount() {
    request
      .get(`/notes/${this.props.user.userid}`)
      .then((res) => {
        let notes = {};
        let note;
        console.log(res.data);

        for (let i = 0; i < res.data.length; i++) {
          note = res.data[i];
          if (!(note.category in notes)) notes[note.category] = [];
          notes[note.category].push(note);
        }
        this.setState({ notes: notes });

        console.log(notes);
      })
      .catch((err) => {
        console.log("Error when getting notes " + err);
      });
  }

  onClickCategory = (e) => {
    this.setState({ category: e.target.innerText });
  };

  render() {
    let count = 1;
    return (
      <div className="container-fluid">
        <ul className="nav mt-4">
          <li className="nav-item">
            <input className="form-control" type="text" placeholder="Search Title" aria-label="Search" />
          </li>
          <li className="dropdown ml-2 border rounded">
            <button className="btn text-primary pl-3 pr-2" data-toggle="dropdown">
              {this.state.category}
              <span className="dropdown-toggle ml-4"></span>
            </button>
            <ul className="dropdown-menu">
              <li>
                <button type="button" className="dropdown-item" onClick={this.onClickCategory}>
                  All Categories
                </button>
              </li>
              {Object.entries(this.state.notes).map(([category, notes]) => {
                return (
                  <li key={category}>
                    <button type="button" className="dropdown-item" onClick={this.onClickCategory}>
                      {category}
                    </button>
                  </li>
                );
              })}
            </ul>
          </li>

          {/* {this.state.notes.map((note) => {
          return <div>{note.title}</div>;
        })} */}
        </ul>
        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Notes Content</th>
              <th scope="col">Category</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(this.state.notes).map(([category, notes]) => {
              return notes.map((note) => {
                return (
                  <tr key={note._id}>
                    <th scope="row">{count++}</th>
                    <td>{note.title}</td>
                    <td>{note.text.substring(0, 20)}</td>
                    <td>{note.category}</td>
                    <td>
                      <button className="btn btn-primay bg-primary">Edit</button>
                    </td>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default NoteList;
