import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users";

export function register(user) {
  return http.post(apiEndpoint + "/register", {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    password: user.password
  });
}
