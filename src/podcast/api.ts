import axios from "axios";
import { navigate } from "@reach/router";

import { API_URL } from "../constants";

import { Podcasts } from "./podcast";

export const list = (token: string): Promise<Podcasts> =>
  axios
    .get(`${API_URL}/podcasts`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => data)
    .catch((err) => handleError({}, err));

export const add = (token: string, url: string): Promise<void> =>
  axios({
    method: "post",
    url: `${API_URL}/podcasts`,
    data: { url },
    headers: { Authorization: `Bearer ${token}` },
  }).catch((err) => handleError(undefined, err));

export const remove = (token: string, id: string): Promise<void> =>
  axios
    .delete(`${API_URL}/podcasts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((err) => handleError(undefined, err));

const handleError = (r: any, err: any) => {
  if (err.response.data.type === "Unconfigured") {
    navigate("/register");
  } else if (err.response.data.type === "UnverifiedToken") {
    navigate("/login");
  } else {
    console.error(err.message);
    return r;
  }
};
