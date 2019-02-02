import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";
const apiEndpoint = apiUrl + "/auth";

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint + "/login", {
    email,
    password
  });
  localStorage.setItem("token", jwt.token);
}

export function logout() {
  localStorage.removeItem("token");
}

export function loginWithJwt(token) {
  localStorage.setItem("token", token);
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    return user;
  } catch (error) {
    return null;
  }
}
