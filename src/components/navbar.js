import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
      <Link to="/" className="navbar-brand">
        Tracker
      </Link>
      <div className="navbar-nav">
        <li className="nav-item ml-3">
          <Link to="/" className="nav-link">
            Exercise
          </Link>
        </li>
        <li className="nav-item ml-3">
          <Link to="/create" className="nav-link">
            Create Exercise Log
          </Link>
        </li>
        <li className="nav-item ml-3">
          <Link to="/user" className="nav-link">
            Create User
          </Link>
        </li>
      </div>
    </nav>
  );
};

export default NavBar;
