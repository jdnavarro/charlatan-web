import axios from "axios";

import { API_URL } from "../constants";

import { Podcast } from "./podcast";

export const podcasts = async (): Promise<Podcast[]> =>
  axios
    .get(`${API_URL}/podcasts`)
    .then(({ data }) => data)
    .catch((err) => {
      console.error(err.message);
      return [];
    });

export const podcast = async (url: String): Promise<void> =>
  axios.post(`${API_URL}/podcasts`, { url });
