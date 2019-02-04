import React, { Component } from "react";
import {
  newTaskCategory,
  getCategories,
  newTask
} from "../services/projectService";
class DashBoard extends Component {
  state = {
    options: [],
    selectedOption: "Dashboard",
    newcategory: "",
    error: null,
    taskcategories: [],
    newTask: {
      title: "",
      description: "",
      category: ""
    },
    taskerror: null
  };

  async componentDidMount() {
    try {
      const categories = await getCategories(
        this.props.location.state.project.id
      );
      this.setState({
        ...this.state,
        taskcategories: categories.data,
        newTask: {
          title: "",
          description: "",
          category: categories.data[0].name
        }
      });
      //refresh categories
    } catch (error) {
      alert(error);
    }
  }
  handleCategoryChange = e => {
    this.setState({ ...this.state, newcategory: e.target.value, error: null });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.doSubmit();
  };

  handleNewTaskSubmit = e => {
    e.preventDefault();
    this.submitNewTask();
  };

  submitNewTask = async () => {
    try {
      await newTask(
        this.state.newTask.title,
        this.state.newTask.description,
        this.state.newTask.category,
        this.props.location.state.project.id
      );
      //refresh tasks
    } catch (error) {
      if (error.response && error.response.status === 400) {
        this.setState({ taskerror: error.response.data });
      }
    }
  };
  doSubmit = async () => {
    try {
      await newTaskCategory(
        this.state.newcategory,
        this.props.location.state.project.id
      );
      this.setState({ ...this.state, newcategory: "" });
      //refresh categories
    } catch (error) {
      if (error.response && error.response.status === 400) {
        this.setState({ error: error.response.data });
      }
    }
  };

  handleChange = e => {
    const project = { ...this.state.newTask };
    project[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ ...this.state, newTask: project, taskerror: null });
  };

  getOptions() {
    let user = this.props.location.state.project.role;
    if (user === "Project Manager") {
      return [
        "Dashboard",
        "Project tasks",
        "Project Documents",
        "Add a project task",
        "Add a task Category",
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
        <div class="card-body" />
      </div>
    );

    let tasks = this.state.selectedOption === "Project tasks" && (
      <div class="card">
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
        </div>
      </div>
    );

    let addAProjectTask = this.state.selectedOption ===
      "Add a project task" && (
      <div class="card">
        <div class="card-header">Add a Project task</div>
        <div class="card-body">
          <form onSubmit={this.handleNewTaskSubmit}>
            {this.state.taskerror && (
              <div className="alert alert-danger" role="alert">
                {this.state.taskerror}
              </div>
            )}
            <div class="form-group">
              <label htmlFor="title">Task Title</label>
              <input
                type="text"
                class="form-control"
                id="title"
                placeholder="title"
                name="title"
                onChange={this.handleChange}
              />
            </div>
            <div class="form-group">
              <label htmlFor="description">Task Description</label>
              <input
                type="text"
                class="form-control"
                id="description"
                placeholder="description"
                onChange={this.handleChange}
                name="description"
              />
            </div>
            <div class="form-group">
              <label for="category">Select a category</label>
              <select
                class="form-control"
                id="category"
                name="category"
                onChange={this.handleChange}
                value={this.state.taskcategories[0]}
              >
                {this.state.taskcategories.map(category => {
                  return <option>{category.name}</option>;
                })}
              </select>
            </div>
            <button type="submit" class="btn btn-primary">
              Add Task
            </button>
          </form>
        </div>
      </div>
    );

    let addTaskCategory = this.state.selectedOption ===
      "Add a task Category" && (
      <div class="card">
        <div class="card-header">Add a task category</div>
        <div class="card-body">
          {this.state.error && (
            <div className="alert alert-danger" role="alert">
              {this.state.error}
            </div>
          )}
          <form class="form-inline" onSubmit={this.handleSubmit}>
            <div class="form-group mx-sm-3 mb-2">
              <input
                type="text"
                class="form-control"
                id="category"
                placeholder="category"
                name="newcategory"
                value={this.state.newcategory}
                onChange={this.handleCategoryChange}
              />
            </div>
            <button type="submit" class="btn btn-primary mb-2">
              Add
            </button>
          </form>
          <div />
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
          {addAProjectTask}
          {addTaskCategory}
        </div>
      </div>
    );
  }
}

export default DashBoard;
