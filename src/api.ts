import axios from "axios";

import type * as episode from "./episode";

export interface Episode extends episode.Core {
  position: number | null;
}

export type Episodes = Map<string, Episode>;

const api_url =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL || ""
    : "";

export const progress = async (id: string, progress: number): Promise<void> => {
  axios.patch(`${api_url}/episodes/${id}`, { progress: Math.round(progress) });
};

export const position = async (
  id: string,
  position: number | null | undefined
): Promise<void> => {
  if (position === undefined) {
    position = 0;
  }
  axios.patch(`${api_url}/episodes/${id}`, { position });
};

export const episodes = async (): Promise<Episodes> => {
  const token = localStorage.getItem("token");
  return axios
    .get(`${api_url}/episodes`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => data)
    .catch((err) => {
      console.error(err.message);
      return new Map();
    });
};
