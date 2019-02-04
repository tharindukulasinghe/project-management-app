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

  formatDesc(desc) {
    if (desc.length > 25) {
      return desc.substring(0, 24) + "...";
    }
    return desc;
  }
  getDateString(date) {
    let dateString = new Date(date);
    return dateString.toDateString();
  }

  navigateToDashBoard(project) {
    this.props.history.push({
      pathname: `/projects/${project.id}`,
      state: {
        project: project
      }
    });
  }

  render() {
    return (
      <div>
        <h1>My Projects</h1>
        <button className="btn btn-primary m-4" onClick={this.newProject}>
          New Project
        </button>
        <div className="card card-5">
          <table className="table table-hover text-center">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Project</th>
                <th scope="col">Description</th>
                <th scope="col">Start Date</th>
                <th scope="col">Due Date</th>
                <th scope="col">My Role</th>
                <th scope="col" />
                <th scope="col"> </th>
                <th scope="col"> </th>
              </tr>
            </thead>
            <tbody>
              {this.state.projects.map(project => (
                <tr>
                  <td className="font-weight-bold">{project.name}</td>
                  <td>{this.formatDesc(project.project.description)}</td>
                  <td>{this.getDateString(project.project.startdate)}</td>
                  <td>{this.getDateString(project.project.duedate)}</td>
                  <td className="font-weight-bold">{project.role}</td>
                  <td>
                    <button
                      className="btn btn-outline-info btn-sm"
                      disabled={!(project.role === "Project Manager")}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      disabled={!(project.role === "Project Manager")}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => this.navigateToDashBoard(project)}
                    >
                      Go to Project
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Projects;
