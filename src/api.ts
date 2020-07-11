import axios from "axios";
import { navigate } from "@reach/router";

import { API_URL } from "./constants";
import type * as episode from "./episode";

export interface Episode extends episode.Core {
  position: number | null;
}

export type Episodes = Map<string, Episode>;

export const progress = (token: string, id: string, progress: number) => {
  axios({
    method: "patch",
    url: `${API_URL}/episodes/${id}`,
    data: { progress: Math.round(progress) },
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const position = (
  token: string,
  id: string,
  position: number | null | undefined
) => {
  if (position === undefined) {
    position = 0;
  }
  axios({
    method: "patch",
    url: `${API_URL}/episodes/${id}`,
    data: { position },
    headers: { Authorization: `Bearer ${token}` },
  }).catch(handleError);
};

export const episodes = (token: string): Promise<Episodes> =>
  axios
    .get(`${API_URL}/episodes`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => data)
    .catch((err) => {
      handleError(err);
      return new Map();
    });

// Explicit refreshing will eventually go away
export const refresh = (token: string) => {
  axios({
    method: "post",
    url: `${API_URL}/crawl`,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(() => window.location.reload())
    .catch(handleError);
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
