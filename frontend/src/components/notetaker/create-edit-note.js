import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import gfm from "remark-gfm";
import "katex/dist/katex.min.css";
import request from "../axios-request";

/* the compoenent for markdown. see https://github.com/remarkjs/react-markdown */
const SHComponent = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    if (inline) {
      return (
        <span className="p-1" style={{ background: "rgb(247,247,247)", fontSize: "17px" }}>
          <code className={className} children={String(children)} {...props} />
        </span>
      );
    }

    if (!inline && match) {
      return <SyntaxHighlighter style={github} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, "")} {...props} />;
    }

    return (
      <div className="px-2 py-2" style={{ background: "rgb(247,247,247)" }}>
        <code className={className} children={String(children)} {...props} />
      </div>
    );
  },
};

class CreateEditNote extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      text: "",
      text_height: 250,
      show_type: "Text",
      category: "",
      title: "",
      message: "",
    };
  }

  componentDidMount() {
    console.log("why 1231");
    if (this.props.edit) {
      request
        .get(`/notes/edit/${this.props.match.params.id}`)
        .then((res) => {
          const note = res.data;
          this.setState({
            text: note.text,
            title: note.title,
            category: note.category,
          });
        })
        .catch((err) => {
          console.log("Error when getting note " + err);
          this.props.history.push("/notetaker");
        });
    } else {
      this.setState({
        text: "",
        text_height: 250,
        show_type: "Text",
        category: "",
        title: "",
        message: "",
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const note = {
      userid: this.props.user.userid,
      text: this.state.text,
      category: this.state.category,
      title: this.state.title,
    };
    if (this.props.edit == false) {
      /* add a new note */
      request
        .post("/notes/create", note)
        .then((res) => {
          console.log(res.data);
          console.log(this.props);
          this.props.setNoteID(res.data._id);
          this.props.history.push("/notetaker/create/success");
        })
        .catch((err) => {
          console.log("Error when creating new note: " + err);
        });
    } else {
      /* update it */
      request
        .put(`/notes/update/${this.props.match.params.id}`, note)
        .then((res) => {
          console.log(res);
          this.setState({ message: "Update note successfully" });
          setTimeout(() => {
            this.setState({ message: "" });
          }, 3000);
        })
        .catch((err) => {
          console.log("Error when updating note: " + err);
        });
    }
  };
  onCategoryChange = (e) => {
    this.setState({ category: e.target.value });
  };
  onTitleChange = (e) => {
    this.setState({ title: e.target.value });
  };
  onTextChange = (e) => {
    this.setState({ text: e.target.value });
  };

  onDeleteNote = (e) => {
    /* make a delete request */
    e.preventDefault();
    request
      .delete(`/notes/delete/${this.props.match.params.id}`)
      .then((res) => {
        console.log(res);
        this.props.history.push("/notetaker");
      })
      .catch((err) => console.log("Error when deleting the note " + err));
  };
  // onTextResize = (e) => {
  //   this.setState({ text_height: e.target.offsetHeight });
  // };

  onKeyDown = (e) => {
    /* handle the tab key */
    if (e.keyCode === 9) {
      e.preventDefault();
      const cur_pos = e.target.selectionStart;
      const new_text = this.state.text.substring(0, cur_pos) + "    " + this.state.text.substring(cur_pos);
      this.setState({ text: new_text }, () => {
        e.target.selectionStart = cur_pos + 4;
        e.target.selectionEnd = cur_pos + 4;
      });
    }
  };

  onClickShowType = (e) => {
    this.setState({ show_type: e.target.id });
  };

  render() {
    return (
      <>
        <div className="container-fluid mt-3" style={{ marginBottom: "200px" }}>
          <h3 className="text-center">{this.props.edit ? "Update the note" : "Create the new note"}</h3>
          <form onSubmit={this.onSubmit}>
            <label className="mt-2">Category:</label>
            <input onChange={this.onCategoryChange} type="text" className="form-control" value={this.state.category} required></input>
            <label className="mt-2">Title:</label>
            <input onChange={this.onTitleChange} type="text" value={this.state.title} className="form-control" required></input>
            {/* Show tabs for text/markdown/both */}
            <ul className="nav nav-tabs mt-4">
              {["Text", "Markdown", "Both"].map((value) => {
                return (
                  <li className="nav-item" key={value}>
                    <button
                      type="button"
                      id={value}
                      className={"nav-link " + (this.state.show_type === value ? "active text-primary" : "border-bottom bg-white")}
                      onClick={this.onClickShowType}
                    >
                      {value}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* only show text */}
            {this.state.show_type === "Text" && (
              <div className="mt-4">
                <textarea
                  className="form-control pt-2"
                  style={{
                    minHeight: "150px",
                    height: this.state.text_height + "px",
                    fontSize: "16px",
                    lineHeight: "115%",
                  }}
                  required
                  onChange={this.onTextChange}
                  onKeyDown={this.onKeyDown}
                  value={this.state.text}
                  spellCheck="false"
                ></textarea>
              </div>
            )}

            {/* only show markdown */}
            {this.state.show_type === "Markdown" && (
              <div
                className="border rounded overflow-auto mt-4 bg-white"
                style={{
                  height: this.state.text_height + "px",
                  fontSize: "15px",
                  paddingBottom: "150px",
                  minHeight: "150px",
                  resize: "vertical",
                }}
              >
                <ReactMarkdown remarkPlugins={[remarkMath, gfm]} rehypePlugins={[rehypeKatex]} className="px-3 py-2" components={SHComponent}>
                  {this.state.text}
                </ReactMarkdown>
              </div>
            )}

            {/* show both text and markdown */}
            {this.state.show_type === "Both" && (
              <div className="row">
                <div className="col-lg-6">
                  <label className="mt-4">Text:</label>
                  <textarea
                    className="form-control pt-2"
                    style={{
                      minHeight: "150px",
                      height: this.state.text_height + "px",
                      fontSize: "16px",
                      lineHeight: "115%",
                    }}
                    required
                    onChange={this.onTextChange}
                    onKeyDown={this.onKeyDown}
                    value={this.state.text}
                    spellCheck="false"
                  ></textarea>
                </div>
                <div className="col-lg-6">
                  <label className="mt-4">Markdown:</label>
                  <div
                    className="border rounded overflow-auto bg-white"
                    style={{
                      height: this.state.text_height + "px",
                      fontSize: "15px",
                      paddingBottom: "150px",
                      minHeight: "150px",
                      resize: "vertical",
                    }}
                  >
                    <ReactMarkdown remarkPlugins={[remarkMath, gfm]} rehypePlugins={[rehypeKatex]} className="px-3 py-2" components={SHComponent}>
                      {this.state.text}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-4">
              <button type="submit" className="btn btn-primary">
                {this.props.edit ? "Update the node" : "Create the new note"}
              </button>
              {this.props.edit && (
                <button type="button" className="btn btn-danger ml-5" data-toggle="modal" data-target="#deletionConfirmation">
                  Delete
                </button>
              )}
            </div>
            <div className="mt-3 text-success">{this.state.message}</div>
          </form>
          {/* 

         
          {/* Deletion Confirmation */}
          <div className="modal fade" id="deletionConfirmation" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Deletion Confirmation</h5>
                  <button type="button" className="close" data-dismiss="modal">
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">Click yes to delete the note</div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">
                    No
                  </button>
                  <button type="button" className="btn btn-primary" onClick={this.onDeleteNote} data-dismiss="modal">
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx="true">{`
          table,
          th,
          td {
            padding: 5px;
            text-align: left;
            border-collapse: collapse;

            border: 1px solid black;
          }

          th,
          tr:nth-child(even) {
            background-color: #f2f2f2;
          }
        `}</style>
      </>
    );
  }
}

export default CreateEditNote;
