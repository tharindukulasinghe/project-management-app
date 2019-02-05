import React, { Component } from "react";
import {
  newTaskCategory,
  getCategories,
  newTask,
  getProjectTasks,
  addCol,
  getCol,
  role,
  fileUpload,
  getDocs,
  assignTask
} from "../services/projectService";
import { toast } from "react-toastify";
import { publicUrl } from "../config.json";

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
    projectTasks: [],
    newCol: {
      col: ""
    },
    colerror: null,
    cols: [],
    assignrole: {
      col: "",
      role: "Architect"
    },
    assignerror: null,
    newdocument: {
      title: "",
      file: null
    },
    uploaderror: null,
    projectDocs: [],
    assigntask: {
      assigntask: "",
      email: ""
    },
    assigntaskerror: null
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
      this.getCols();
      this.getProjectTasks();
      this.getProjectDocs();
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
        this.setState({ ...this.state, taskerror: error.response.data });
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
        this.setState({ ...this.state, error: error.response.data });
      }
    }
  };

  handleChange = e => {
    const project = { ...this.state.newTask };
    project[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ ...this.state, newTask: project, taskerror: null });
  };

  handleAssignRoleChange = e => {
    const assignrole = { ...this.state.assignrole };
    assignrole[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ ...this.state, assignrole: assignrole, assignerror: null });
  };

  handleAssignTaskChange = e => {
    const assigntask = { ...this.state.assigntask };
    assigntask[e.currentTarget.name] = e.currentTarget.value;
    this.setState({
      ...this.state,
      assigntask: assigntask,
      assigntaskerror: null
    });
  };

  handlenewColChange = e => {
    const col = { ...this.state.newCol };
    col[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ ...this.state, newCol: col, colerror: null });
  };

  getOptions() {
    let user = this.props.location.state.project.role;
    if (user === "Project Manager") {
      return [
        "Dashboard",
        "Project tasks",
        "Add a project task",
        "Assign Tasks",
        "Add a task Category",
        "Assign Roles",
        "Project Documents",
        "Add a Project Document",
        "Invite collaborators"
      ];
    } else if (user === "Architect") {
      return ["Dashboard", "Add a task", "Upload a Document"];
    }
  }

  onOptionSelect(option) {
    this.setState({ ...this.state, selectedOption: option });
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

  async getCols() {
    const projectCols = await getCol(this.props.location.state.project.id);
    this.setState({
      ...this.state,
      cols: projectCols.data,
      assignrole: { col: projectCols.data[0], role: "Architect" }
    });
  }

  async getProjectDocs() {
    const projectDocs = await getDocs(this.props.location.state.project.id);
    console.log(projectDocs);
    this.setState({
      ...this.state,
      projectDocs: projectDocs.data
    });
  }

  projectAssignRole = async () => {
    try {
      await role(
        this.props.location.state.project.id,
        this.state.assignrole.col,
        this.state.assignrole.role,
        this.props.location.state.project
      );
      toast.success("Project role assigned successfully!", {
        position: toast.POSITION.TOP_CENTER
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        this.setState({ ...this.state, assignerror: error.response.data });
      }
    }
  };

  async addCollaborator() {
    try {
      await addCol(this.props.location.state.project.id, this.state.newCol.col);
      this.setState({ ...this.state, newCol: { col: "" } });
      toast.success("Invitation sent successfully!", {
        position: toast.POSITION.TOP_CENTER
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        this.setState({ ...this.state, colerror: error.response.data });
      }
    }
  }

  handlenewCol = e => {
    e.preventDefault();
    this.addCollaborator();
  };

  handleAssignRole = e => {
    e.preventDefault();
    console.log("eee");
    this.projectAssignRole();
  };

  handleAssignTask = e => {
    e.preventDefault();
    console.log("ee");
    this.projectAssignTask();
  };

  projectAssignTask = async () => {
    try {
      await assignTask(
        this.state.assigntask.assigntask,
        this.state.assigntask.email
      );
      toast.success("Task assigned successfully!", {
        position: toast.POSITION.TOP_CENTER
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(error);
        this.setState({ ...this.state, assigntaskerror: error.response.data });
      }
    }
  };

  newTaskF = () => {
    this.setState({
      ...this.state,
      selectedOption: "Add a project task"
    });
  };

  onFileChange = e => {
    const newdocument = { ...this.state.newdocument };
    newdocument.file = e.target.files[0];
    this.setState({ ...this.state, newdocument });
  };

  onFileTitleChange = e => {
    const newdocument = { ...this.state.newdocument };
    newdocument[e.currentTarget.name] = e.currentTarget.value;
    this.setState({
      ...this.state,
      newdocument: newdocument,
      uploaderror: null
    });
  };

  onFileSubmit = e => {
    e.preventDefault();
    this.projectFileUpload();
  };

  async projectFileUpload() {
    try {
      await fileUpload(
        this.state.newdocument.file,
        this.state.newdocument.title,
        this.props.location.state.project.id
      );
      this.setState({
        ...this.state,
        newdocument: {
          title: "",
          file: null
        }
      });
      toast.success("Document Successfully uploaded!", {
        position: toast.POSITION.TOP_CENTER
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        this.setState({ ...this.state, uploaderror: error.response.data });
      }
    }
  }
  render() {
    let options = this.getOptions();

    let dashboard = this.state.selectedOption === "Dashboard" && (
      <div className="card">
        <div className="card-header">Project Dashboard</div>
        <div className="card-body">
          <h3 class="card-title">
            Project : {this.props.location.state.project.name}
          </h3>
          <div className="row">
            <div className="col-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Collaborators</h5>
                  <h1 class="card-subtitle mb-2 text-muted">
                    {this.state.cols.length}
                  </h1>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Project Tasks</h5>
                  <h1 class="card-subtitle mb-2 text-muted">
                    {this.state.projectTasks.length}
                  </h1>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Documents</h5>
                  <h1 class="card-subtitle mb-2 text-muted">
                    {this.state.projectDocs.length}
                  </h1>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Task Categories</h5>
                  <h1 class="card-subtitle mb-2 text-muted">
                    {this.state.cols.length}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    let tasks = this.state.selectedOption === "Project tasks" && (
      <div className="card" style={{ marginRight: 0, paddingRight: 0 }}>
        <div className="card-body">
          <button className="btn btn-success" onClick={this.newTaskF}>
            Add a task
          </button>
          <button className="btn btn-info m-2" onClick={this.getProjectTasks}>
            Refresh tasks
          </button>
          <div className="row">
            {this.state.projectTasks.map(task => {
              return (
                <div className="col-6">
                  <div className="card" style={{ width: 330 }}>
                    <div className="card-body">
                      <h5 className="card-title">{task.title}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {task.category}
                      </h6>
                      <p className="card-text">{task.description}</p>
                      <p className="card-text">Assigned to : </p>
                      <ul>
                        {task.assingedPersons.map(i => (
                          <li>{i}</li>
                        ))}
                      </ul>
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
      <div className="card">
        <div className="card-header">Project Documents</div>
        <div className="card-body">
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Title</th>
                <th scope="col">file name</th>
                <th scope="col">#</th>
              </tr>
            </thead>
            <tbody>
              {this.state.projectDocs.map(doc => {
                return (
                  <tr>
                    <td>{doc.title}</td>
                    <td>{doc.originalname}</td>
                    <td>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={publicUrl + "/" + doc.savedname}
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );

    let adddocument = this.state.selectedOption ===
      "Add a Project Document" && (
      <div className="card">
        <div className="card-header">Add Project Document</div>
        <div className="card-body">
          <form onSubmit={this.onFileSubmit}>
            <div className="form-group">
              {this.state.uploaderror && (
                <div className="alert alert-danger" role="alert">
                  {this.state.uploaderror}
                </div>
              )}
              <label htmlFor="documenttitle">Document Title</label>
              <input
                type="text"
                className="form-control"
                id="documenttitle"
                placeholder="title"
                name="title"
                value={this.state.newdocument.title}
                onChange={this.onFileTitleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="file"
                className=""
                id="document"
                onChange={this.onFileChange}
              />
              <label className="" htmlFor="customFile">
                Choose document
              </label>
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Upload
            </button>
          </form>
        </div>
      </div>
    );

    let assignRoles = this.state.selectedOption === "Assign Roles" && (
      <div className="card">
        <div className="card-header">Assign Roles</div>
        <div className="card-body">
          <form onSubmit={this.handleAssignRole}>
            <div className="form-group">
              {this.state.assignerror && (
                <div className="alert alert-danger" role="alert">
                  {this.state.assignerror}
                </div>
              )}
              <label htmlFor="exampleFormControlSelect1">
                Select Collaborator
              </label>
              <select
                className="form-control"
                id="colemail"
                onChange={this.handleAssignRoleChange}
                name="col"
                value={this.state.assignrole.col}
              >
                {this.state.cols.map(col => {
                  return <option key={col}>{col}</option>;
                })}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="role">Select Role</label>
              <select
                className="form-control"
                id="role"
                onChange={this.handleAssignRoleChange}
                name="role"
              >
                <option>Architect</option>
                <option>Developer</option>
                <option>UI/UX Engineer</option>
                <option>QA Engineer</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Assign
            </button>
          </form>
        </div>
      </div>
    );

    let addAProjectTask = this.state.selectedOption ===
      "Add a project task" && (
      <div className="card">
        <div className="card-header">Add a Project task</div>
        <div className="card-body">
          <form onSubmit={this.handleNewTaskSubmit}>
            {this.state.taskerror && (
              <div className="alert alert-danger" role="alert">
                {this.state.taskerror}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="title">Task Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="title"
                name="title"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Task Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                placeholder="description"
                onChange={this.handleChange}
                name="description"
              />
            </div>
            <div className="form-group">
              <label for="category">Select a category</label>
              <select
                className="form-control"
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
            <button type="submit" className="btn btn-primary">
              Add Task
            </button>
          </form>
        </div>
      </div>
    );

    let addTaskCategory = this.state.selectedOption ===
      "Add a task Category" && (
      <div className="card">
        <div className="card-header">Add a task category</div>
        <div className="card-body">
          {this.state.error && (
            <div className="alert alert-danger" role="alert">
              {this.state.error}
            </div>
          )}
          <form className="form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group mx-sm-3 mb-2">
              <input
                type="text"
                className="form-control"
                id="category"
                placeholder="category"
                name="newcategory"
                value={this.state.newcategory}
                onChange={this.handleCategoryChange}
              />
            </div>
            <button type="submit" className="btn btn-primary mb-2">
              Add
            </button>
          </form>
          <div />
        </div>
      </div>
    );

    let collaborators = this.state.selectedOption ===
      "Invite collaborators" && (
      <div className="card">
        <div className="card-header">Invite Collaborators</div>
        <div className="card-body">
          {this.state.colerror && (
            <div className="alert alert-danger" role="alert">
              {this.state.colerror}
            </div>
          )}
          <form className="form-inline" onSubmit={this.handlenewCol}>
            <div className="form-group mb-2">
              <label for="staticEmail2" className="sr-only">
                Enter email
              </label>
              <input
                type="text"
                readonly
                className="form-control-plaintext"
                id="staticEmail2"
                value="Enter email address"
              />
            </div>
            <div className="form-group mx-sm-3 mb-2">
              <label for="inputPassword2" className="sr-only">
                email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="example@domain.com"
                name="col"
                value={this.state.newCol.col}
                onChange={this.handlenewColChange}
              />
            </div>
            <button type="submit" className="btn btn-primary mb-2">
              Invite
            </button>
          </form>
          <div />
        </div>
      </div>
    );

    let assignTasks = this.state.selectedOption === "Assign Tasks" && (
      <div className="card">
        <div className="card-header">Assign Tasks</div>
        <div className="card-body">
          <form onSubmit={this.handleAssignTask}>
            <div className="form-group">
              {this.state.assigntaskerror && (
                <div className="alert alert-danger" role="alert">
                  {this.state.assigntaskerror}
                </div>
              )}
              <label htmlFor="exampleFormControlSelect1">Select Task</label>
              <select
                className="form-control"
                id="colemail"
                onChange={this.handleAssignTaskChange}
                name="assigntask"
              >
                <option value="" />
                {this.state.projectTasks.map(task => {
                  return (
                    <option key={task._id} value={task._id}>
                      {task.title}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">
                Select Collaborator
              </label>
              <select
                className="form-control"
                id="colemail"
                onChange={this.handleAssignTaskChange}
                name="email"
              >
                <option value=""> </option>
                {this.state.cols.map(col => {
                  return <option key={col}>{col}</option>;
                })}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Assign
            </button>
          </form>
        </div>
      </div>
    );
    return (
      <div className="container down">
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
            {adddocument}
            {collaborators}
            {assignRoles}
            {assignTasks}
          </div>
        </div>
      </div>
    );
  }
}

export default DashBoard;
