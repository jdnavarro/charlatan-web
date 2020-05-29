export interface Episode {
  title: string;
  src: string;
  progress: number;
  position: number | null;
}

export type Episodes = Map<string, Episode>;

const api_url =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL || ""
    : "";

// TODO: Handle error
export const progress = async (id: string, progress: number): Promise<void> => {
  await fetch(`${api_url}/episodes/${id}/progress`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Math.round(progress)),
  });
};

// TODO: Handle error
export const episodes = async (): Promise<Episodes> => {
  return await (await fetch(`${api_url}/episodes`)).json();
};

export const podcast = async (url: String): Promise<void> => {
  fetch("/podcasts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(url),
  });
};
