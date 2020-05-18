import React from "react";

import { Episode } from "./episode";

interface Props {
  currentEpisode: Episode;
  setCurrentEpisode: (e: Episode) => void;
  playing: boolean;
  setDuration: (n: number) => void;
  seekTime: number | null;
  setSeekTime: (n: any) => void;
}

export const Audio: React.FC<Props> = (props) => {
  const {
    currentEpisode,
    setCurrentEpisode,
    playing,
    setDuration,
    seekTime,
    setSeekTime,
  } = props;

  const audioEl = React.useRef<HTMLAudioElement>(null);

  React.useEffect(() => {
    if (audioEl.current !== null) {
      const audio = audioEl.current;
      const loadedData = () => {
        setDuration(audio.duration);
        audio.currentTime = currentEpisode.progress;
      };

      const timeUpdate = () => {
        setCurrentEpisode({ ...currentEpisode, progress: audio.currentTime });
      };

      playing ? audio.play() : audio.pause();

      if (seekTime && seekTime !== currentEpisode.progress) {
        audio.currentTime = seekTime;
        setCurrentEpisode({ ...currentEpisode, progress: audio.currentTime });
        setSeekTime(null);
      }

      audio.addEventListener("loadeddata", loadedData);

      audio.addEventListener("timeupdate", timeUpdate);

      return () => {
        audio.removeEventListener("loadeddata", loadedData);
        audio.removeEventListener("timeupdate", timeUpdate);
      };
    }
  }, [playing, currentEpisode, seekTime]);

  return <audio src={currentEpisode.src} ref={audioEl} />;
};
