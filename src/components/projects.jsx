import React, { Component } from "react";
import { getProjects } from "../services/projectService";
class Projects extends Component {
  state = {
    projects: []
  };

  newProject = () => {
    this.props.history.push("/new-project");
  };

  async componentDidMount() {
    try {
      const { data: projects } = await getProjects();
      console.log(projects);
      this.setState({ projects });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        this.setState({ loginerror: error.response.data });
      }
    }
  }

  getDateString(date) {
    let dateString = new Date(date);
    return dateString.toDateString();
  }
  render() {
    return (
      <div>
        <h1>My Projects</h1>
        <button className="btn btn-primary m-4" onClick={this.newProject}>
          New Project
        </button>
        <table className="table table-hover text-center">
          <thead>
            <tr>
              <th scope="col">Project</th>
              <th scope="col">Description</th>
              <th scope="col">Start Date</th>
              <th scope="col">Due Date</th>
              <th scope="col" />
              <th scope="col"> </th>
            </tr>
          </thead>
          <tbody>
            {this.state.projects.map(project => (
              <tr>
                <td>{project.name}</td>
                <td>{project.project.description}</td>
                <td>{this.getDateString(project.project.startdate)}</td>
                <td>{this.getDateString(project.project.duedate)}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    disabled={!(project.role === "Project Manager")}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    disabled={!(project.role === "Project Manager")}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Projects;
