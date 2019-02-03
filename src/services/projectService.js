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
