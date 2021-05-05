import React from "react";
import { Link } from "react-router-dom";

const CreateNoteSuccess = (props) => {
  return (
    <div className="alert alert-success" role="alert">
      Add the note successfully
      <br />
      <Link to="/notetaker/create">
        <button type="button" className="btn btn-primary mt-3">
          Create another note
        </button>
      </Link>
      <Link to={`/notetaker/edit/${props.noteid}`}>
        <button type="button" className="btn btn-primary mt-3 ml-5">
          Edit this note
        </button>
      </Link>
    </div>
  );
};

export default CreateNoteSuccess;
