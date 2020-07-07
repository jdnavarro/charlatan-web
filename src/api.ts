import axios from "axios";
import { navigate } from "@reach/router";

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
  token: string,
  id: string,
  position: number | null | undefined
): Promise<void> => {
  if (position === undefined) {
    position = 0;
  }
  axios
    .patch(`${api_url}/episodes/${id}`, {
      data: position,
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch(handleError);
};

export const episodes = async (token: string): Promise<Episodes> => {
  return axios
    .get(`${api_url}/episodes`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => data)
    .catch((err) => {
      handleError(err);
      return new Map();
    });
};

const handleError = (err: any) => {
  if (err.response.data.type === "Unconfigured") {
    navigate("/register");
  } else if (err.response.data.type === "UnverifiedToken") {
    navigate("/login");
  } else {
    console.error(err.message);
  }
};
