import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./home/home.css";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
        <Link className="navbar-brand" to="/">
          Project Management System
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link" to="/features">
              Features
            </NavLink>
            <NavLink className="nav-item nav-link" to="/pricing">
              Pricing
            </NavLink>
            <NavLink className="nav-item nav-link" to="/customers">
              Customers
            </NavLink>
            {this.props.user && (
              <NavLink className="nav-item nav-link" to="/projects">
                My Projects
              </NavLink>
            )}
          </div>
        </div>
        <form className="form-inline my-2 my-lg-0">
          {!this.props.user && (
            <React.Fragment>
              <NavLink
                className="nav-item nav-link btn btn-outline-success form-group"
                to="/login"
              >
                Login
              </NavLink>
              <NavLink
                className="nav-item nav-link btn btn-outline-info form-group m-2"
                to="/register"
              >
                Register
              </NavLink>
            </React.Fragment>
          )}
          {this.props.user && (
            <React.Fragment>
              <NavLink
                className="nav-item btn btn-outline-success form-group"
                to="/projects"
              >
                Hi {this.props.user.firstname} !
              </NavLink>
              <NavLink
                className="nav-item btn btn-outline-info form-group m-1"
                to="/logout"
              >
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </form>
      </nav>
    );
  }
}

export default NavBar;
