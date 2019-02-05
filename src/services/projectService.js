import http from "./httpService";
import { getCurrentUser } from "./authService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/projects";

export function newproject(project) {
  const manager = getCurrentUser().email;
  const startdate = convertDate(project.startdate).getTime();
  const duedate = convertDate(project.duedate).getTime();
  return http.post(apiEndpoint + "/newproject", {
    name: project.name,
    description: project.description,
    manager: manager,
    startdate: startdate,
    duedate: duedate
  });
}

function convertDate(dateString) {
  let parts = dateString.split("-");

  let mydate = new Date(parts[0], parts[1] - 1, parts[2]);
  return mydate;
}

export function getProjects() {
  let email = getCurrentUser().email;
  return http.get(apiEndpoint + `/getByemail?email=${email}`);
}

export function newTaskCategory(category, id) {
  console.log(id);
  return http.post(apiEndpoint + "/newcategory", {
    name: category,
    projectId: id
  });
}

export function getCategories(id) {
  return http.get(apiEndpoint + `/getCategories?id=${id}`);
}

export function newTask(title, description, category, projectId) {
  return http.post(apiEndpoint + "/newProjectTask", {
    title: title,
    description: description,
    category: category,
    projectId: projectId
  });
}

export function getProjectTasks(id) {
  return http.get(apiEndpoint + `/getProjectTasks?id=${id}`);
}

export function addCol(id, col) {
  return http.get(apiEndpoint + `/inviteCol?projectId=${id}&email=${col}`);
}

export function getCol(id) {
  return http.get(apiEndpoint + `/getCols?id=${id}`);
}

export function role(id, email, role, project) {
  return http.post(apiEndpoint + "/projectRoleAssign", {
    id: id,
    email: email,
    role: role,
    project: project
  });
}

export function fileUpload(file, title, id) {
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };

  const formData = new FormData();
  formData.append("document", file);
  formData.append("title", title);
  formData.append("id", id);
  return http.post(apiEndpoint + "/projectDocument", formData, config);
}

export function getDocs(id) {
  return http.get(apiEndpoint + `/getDocs?id=${id}`);
}

export function assignTask(taskid, email) {
  return http.post(apiEndpoint + "/projectTaskAssign", {
    taskid: taskid,
    email: email
  });
}
