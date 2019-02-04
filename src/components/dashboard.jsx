import React, { Component } from "react";

class DashBoard extends Component {
  state = {
    options: [],
    selectedOption: "Dashboard"
  };

  getOptions() {
    let user = this.props.location.state.project.role;
    if (user === "Project Manager") {
      return [
        "Dashboard",
        "Project tasks",
        "Project Documents",
        "Invite collaborators"
      ];
    } else if (user === "Architect") {
      return ["Dashboard", "Add a task", "Upload a Document"];
    }
  }

  onOptionSelect(option) {
    this.setState({ selectedOption: option });
  }
  render() {
    let options = this.getOptions();

    let dashboard = this.state.selectedOption === "Dashboard" && (
      <div class="card">
        <div class="card-header">Project Dashboard</div>
        <div class="card-body">
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <a href="#" class="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    );

    let tasks = this.state.selectedOption === "Project tasks" && (
      <div class="card">
        <div class="card-header">Project tasks</div>
        <div class="card-body">
          <button class="btn btn-success">Add a task</button>
          <button class="btn btn-info m-2">Refresh tasks</button>
        </div>
      </div>
    );

    let documents = this.state.selectedOption === "Project Documents" && (
      <div class="card">
        <div class="card-header">Project Documents</div>
        <div class="card-body">
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <a href="#" class="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    );
    return (
      <div className="row">
        <div className="col-3">
          <ul className="list-group">
            {options.map(option => {
              return (
                <li
                  key={option}
                  className={
                    option === this.state.selectedOption
                      ? "list-group-item active pointer"
                      : "list-group-item pointer"
                  }
                  onClick={() => this.onOptionSelect(option)}
                >
                  {option}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="col">
          {dashboard}
          {tasks}
          {documents}
        </div>
      </div>
    );
  }
}

export default DashBoard;
