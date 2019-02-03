import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { newproject } from "../services/projectService";

class NewProject extends Component {
  constructor(props) {
    super(props);
    var MyDate = new Date();

    let MyDateString =
      MyDate.getFullYear() +
      "-" +
      ("0" + (MyDate.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + MyDate.getDate()).slice(-2);
    this.state = {
      project: {
        name: "",
        description: "",
        startdate: MyDateString,
        duedate: MyDateString
      },
      error: null
    };
  }
  state = {
    project: {
      name: "",
      description: "",
      startdate: "",
      duedate: ""
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.doSubmit();
  };

  doSubmit = async () => {
    try {
      await newproject(this.state.project);
      window.location = "/projects";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        this.setState({ error: error.response.data });
      }
    }
  };

  getStartDate = e => {
    const project = { ...this.state.project };
    project.startdate = e.target.value;
    this.setState({ project });
  };

  getDueDate = e => {
    const project = { ...this.state.project };
    project.duedate = e.target.value;
    this.setState({ project });
  };

  handleChange = e => {
    const project = { ...this.state.project };
    project[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ project });
  };

  render() {
    return (
      <div className="d-flex justify-content-center">
        <form className="" style={{ width: 500 }} onSubmit={this.handleSubmit}>
          {this.state.error && (
            <div className="alert alert-danger" role="alert">
              {this.state.error}
            </div>
          )}
          <h2 className="mb-4">Create a new Project</h2>
          <div className="form-group">
            <label htmlFor="name">Project Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              aria-describedby="emailHelp"
              placeholder="Enter project name"
              name="name"
              value={this.state.project.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Project Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="Enter project description"
              name="description"
              value={this.state.project.description}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <TextField
              id="date"
              label="Start Date"
              type="date"
              InputLabelProps={{
                shrink: true
              }}
              onChange={this.getStartDate}
              value={this.state.project.startdate}
            />
          </div>
          <div className="form-group">
            <TextField
              id="date"
              label="Due Date"
              type="date"
              InputLabelProps={{
                shrink: true
              }}
              value={this.state.project.duedate}
              onChange={this.getDueDate}
            />
          </div>
          <Button variant="contained" color="primary" type="submit">
            Add Project
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(null)(NewProject);
