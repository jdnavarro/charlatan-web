import axios from "axios";

import { API_URL } from "../constants";

import { Podcasts } from "./podcast";

export const podcasts = async (): Promise<Podcasts> =>
  axios
    .get(`${API_URL}/podcasts`)
    .then(({ data }) => data)
    .catch((err) => {
      console.error(err.message);
      return {};
    });

export const podcast = async (url: string): Promise<void> =>
  axios.post(`${API_URL}/podcasts`, { url });

export const remove = async (id: string): Promise<void> =>
  axios.delete(`${API_URL}/podcasts/${id}`);
