import React, { Component } from "react";
import {
  newTaskCategory,
  getCategories,
  newTask,
  getProjectTasks
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
    taskerror: null,
    projectTasks: []
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

      this.getProjectTasks();

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

  async getProjectTasks() {
    const projectTasks = await getProjectTasks(
      this.props.location.state.project.id
    );
    this.setState({
      ...this.state,
      projectTasks: projectTasks.data
    });
  }
  newTaskF = () => {
    this.setState({
      ...this.state,
      selectedOption: "Add a project task"
    });
  };

  render() {
    let options = this.getOptions();

    let dashboard = this.state.selectedOption === "Dashboard" && (
      <div class="card">
        <div class="card-header">Project Dashboard</div>
        <div class="card-body" />
      </div>
    );

    let tasks = this.state.selectedOption === "Project tasks" && (
      <div class="card" style={{ marginRight: 0, paddingRight: 0 }}>
        <div class="card-body">
          <button class="btn btn-success" onClick={this.newTaskF}>
            Add a task
          </button>
          <button class="btn btn-info m-2" onClick={this.getProjectTasks}>
            Refresh tasks
          </button>
          <div className="row">
            {this.state.projectTasks.map(task => {
              return (
                <div className="col-6">
                  <div class="card" style={{ width: 330 }}>
                    <div class="card-body">
                      <h5 class="card-title">{task.title}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">
                        {task.category}
                      </h6>
                      <p class="card-text">{task.description}</p>
                      <a href="#" class="card-link">
                        Card link
                      </a>
                      <a href="#" class="card-link">
                        Another link
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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

    let collaborators = this.state.selectedOption ===
      "Invite collaborators" && (
      <div class="card">
        <div class="card-header">Invite Collaborators</div>
        <div class="card-body">
          {this.state.colerror && (
            <div className="alert alert-danger" role="alert">
              {this.state.colerror}
            </div>
          )}
          <form class="form-inline">
            <div class="form-group mb-2">
              <label for="staticEmail2" class="sr-only">
                Enter email
              </label>
              <input
                type="text"
                readonly
                class="form-control-plaintext"
                id="staticEmail2"
                value="Enter email address"
              />
            </div>
            <div class="form-group mx-sm-3 mb-2">
              <label for="inputPassword2" class="sr-only">
                Password
              </label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="example@domain.com"
                name="email"
              />
            </div>
            <button type="submit" class="btn btn-primary mb-2">
              Invite
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
          {collaborators}
        </div>
      </div>
    );
  }
}

export default DashBoard;
