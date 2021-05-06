import React, { Component } from "react";
import request from "../axios-request";
import $ from "jquery";

const TableEnry = ({ note, count, search_title, search_content, title_cs, content_cs, history }) => {
  if (search_title !== "") {
    if (title_cs && note.title.search(search_title) === -1) return null;
    if (!title_cs && note.title.search(new RegExp(search_title, "i")) === -1) return null;
  }

  if (search_content !== "") {
    if (content_cs && note.text.search(search_content) === -1) return null;
    if (!content_cs && note.text.search(new RegExp(search_content, "i")) === -1) return null;
  }

  return (
    <tr
      onClick={() => {
        history.push(`/notetaker/edit/${note._id}`);
      }}
      style={{ cursor: "pointer" }}
    >
      <th scope="row" style={{ width: "40px" }}>
        {count}
      </th>
      <td>{note.title}</td>
      <td>
        {note.text.substring(0, 200)}
        {note.text.length > 200 && <span> &middot;&middot;&middot;</span>}
      </td>
      <td>{note.category}</td>
    </tr>
  );
};

const SearchInput = ({ toggle, onChange, placeholder, onClick }) => {
  return (
    <li className="nv-item ml-2 mt-2">
      <div className="input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <input type="checkbox" data-toggle={toggle} title="check it to switch to case sensitive" onClick={onClick} />
          </div>
        </div>
        <input type="text" className="form-control" placeholder={placeholder} onChange={onChange} />
      </div>
    </li>
  );
};

class NoteList extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      notes: {} /* key is the catergory, values are all notes belong to that category */,
      category: "All categories",
      search_title: "",
      search_content: "",
      search_title_cs: false /* case sensitive */,
      search_content_cs: false,
    };
  }
  componentDidMount() {
    /* this is for tooltip from bootstrap */
    $('[data-toggle="tooltip-title"]').tooltip();
    $('[data-toggle="tooltip-content"]').tooltip();
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
      })
      .catch((err) => {
        console.log("Error when getting notes " + err);
      });
  }

  onClickCategory = (e) => {
    this.setState({ category: e.target.innerText });
  };

  onChangeSearchTitle = (e) => {
    this.setState({ search_title: e.target.value });
  };

  onChangeSearchContent = (e) => {
    this.setState({ search_content: e.target.value });
  };

  onClickSearchTitle = (e) => {
    this.setState({ search_title_cs: e.target.checked });
  };

  onClickSearchContent = (e) => {
    this.setState({ search_content_cs: e.target.checked });
  };

  render() {
    let count = 1;
    return (
      <div className="container-fluid">
        <ul className="nav mt-3">
          <SearchInput toggle="tooltip-title" placeholder="Search Title" onClick={this.onClickSearchTitle} onChange={this.onChangeSearchTitle} />
          <SearchInput
            toggle="tooltip-content"
            placeholder="Search Content"
            onClick={this.onClickSearchContent}
            onChange={this.onChangeSearchContent}
          />

          <li className="nav-item dropdown border rounded ml-2 mt-2">
            <button className="btn text-primary pl-3 pr-2" data-toggle="dropdown">
              {this.state.category}
              <span className="dropdown-toggle ml-4"></span>
            </button>
            <ul className="dropdown-menu">
              <li>
                <button type="button" className="dropdown-item" onClick={this.onClickCategory}>
                  All categories
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
        </ul>

        {/* show table for selected category notes */}
        <table className="table table-hover mt-4">
          <thead>
            <tr>
              <th scope="col" style={{ width: "40px" }}>
                #
              </th>
              <th scope="col">Title</th>
              <th scope="col">Notes Content</th>
              <th scope="col">Category</th>
            </tr>
          </thead>
          <tbody>
            {this.state.category === "All categories"
              ? Object.entries(this.state.notes).map(([category, notes]) => {
                  return notes.map((note) => {
                    return (
                      <TableEnry
                        key={note._id}
                        note={note}
                        count={count++}
                        title_cs={this.state.search_title_cs}
                        content_cs={this.state.search_content_cs}
                        search_title={this.state.search_title}
                        search_content={this.state.search_content}
                        history={this.props.history}
                      />
                    );
                  });
                })
              : this.state.notes[this.state.category].map((note) => {
                  return (
                    <TableEnry
                      key={note._id}
                      note={note}
                      count={count++}
                      title_cs={this.state.search_title_cs}
                      content_cs={this.state.search_content_cs}
                      search_title={this.state.search_title}
                      search_content={this.state.search_content}
                      history={this.props.history}
                    />
                  );
                })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default NoteList;
