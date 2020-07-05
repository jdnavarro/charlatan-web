import axios from "axios";

import { API_URL } from "../constants";

export const register = (name: string, password: string) =>
  axios.post(`${API_URL}/register`, {
    name,
    password,
  });

export const login = (name: string, password: string) =>
  axios
    .post(`${API_URL}/login`, {
      name,
      password,
    })
    .then((response) => {
      console.log(response.data);
      if (response.data) {
        localStorage.setItem("token", response.data);
      }
      window.location.assign("/");
    });
