import { Link } from "react-router-dom";

const Nav = (props) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/notetaker" className="navbar-brand mr-5">
          NoteTaker
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/notetaker" className="nav-link">
                Note list
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/notetaker/create" className="nav-link">
                Create New Note
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/" className="nav-link">
                logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
