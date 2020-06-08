import type * as current from "./current";
import type * as feed from "./feed";
import type * as queue from "./queue";
import type * as api from "./api";

export interface Core {
  id: string;
  title: string;
  progress: number;
  duration: number;
  publication: Date;
  image: URL;
}

export type Full = Omit<
  feed.Episode &
    queue.Episode &
    current.Episode &
    feed.Details &
    // Details &
    api.Episode,
  "id" | "playing"
>;

export type Dict = Map<string, Full>;

// export interface Details extends current.Details {
//   queued: boolean;
// }
