import React, { Component } from "react";
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
      return (
        <SyntaxHighlighter
          style={github}
          language={match[1]}
          PreTag="div"
          children={String(children).replace(/\n$/, "")}
          {...props}
        />
      );
    }

    return (
      <div className="px-2 py-2" style={{ background: "rgb(247,247,247)" }}>
        <code className={className} children={String(children)} {...props} />
      </div>
    );
  },
};

class CreateNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      text_height: 250,
      show_type: "Text",
      category: "",
      title: "",
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const note = {
      userid: this.props.user.userid,
      text: this.state.text,
      category: this.state.category,
      title: this.state.title,
    };
    request
      .post("/notes/create", note)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error when creating new note: " + err);
      });
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
          <h3 className="text-center">Create a new note</h3>
          <form onSubmit={this.onSubmit}>
            <label className="mt-2">Title:</label>
            <input onChange={this.onTitleChange} type="text" className="form-control" required></input>
            <label className="mt-2">Category:</label>
            <input onChange={this.onCategoryChange} className="form-control" required></input>
            {/* Show tabs for text/markdown/both */}
            <ul className="nav nav-tabs mt-4">
              {["Text", "Markdown", "Both"].map((value) => {
                return (
                  <li className="nav-item" key={value}>
                    <button
                      type="button"
                      id={value}
                      className={
                        "nav-link " +
                        (this.state.show_type === value ? "active text-primary" : "border-bottom bg-white")
                      }
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
                className="border rounded overflow-auto mt-4"
                style={{
                  height: this.state.text_height + "px",
                  fontSize: "15px",
                  paddingBottom: "150px",
                  minHeight: "150px",
                  resize: "vertical",
                }}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkMath, gfm]}
                  rehypePlugins={[rehypeKatex]}
                  className="px-3 py-2"
                  components={SHComponent}
                >
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
                    className="border rounded overflow-auto"
                    style={{
                      height: this.state.text_height + "px",
                      fontSize: "15px",
                      paddingBottom: "150px",
                      minHeight: "150px",
                      resize: "vertical",
                    }}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkMath, gfm]}
                      rehypePlugins={[rehypeKatex]}
                      className="px-3 py-2"
                      components={SHComponent}
                    >
                      {this.state.text}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            )}
            <button type="submit" className="btn btn-primary mt-4">
              Create a new note
            </button>
          </form>
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

export default CreateNote;
