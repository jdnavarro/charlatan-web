import React from "react";

import { CurrentEpisode } from "./episode";

interface Props {
  currentEpisode: CurrentEpisode;
  setCurrentEpisode: (e: CurrentEpisode) => void;
  setDuration: (n: number) => void;
  seekTime: number | null;
  setSeekTime: (n: any) => void;
}

export const Audio: React.FC<Props> = (props) => {
  const {
    currentEpisode,
    setCurrentEpisode,
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

      const interval = setInterval(() => {
        if (currentEpisode.playing) {
          setCurrentEpisode({
            ...currentEpisode,
            progress: audio.currentTime,
          });
        }
      }, 5000);

      currentEpisode.playing ? audio.play() : audio.pause();

      if (seekTime && seekTime !== currentEpisode.progress) {
        audio.currentTime = seekTime;
        setCurrentEpisode({ ...currentEpisode, progress: audio.currentTime });
        setSeekTime(null);
      }

      audio.addEventListener("loadeddata", loadedData);

      return () => {
        audio.removeEventListener("loadeddata", loadedData);
        clearInterval(interval);
      };
    }
  });

  return <audio src={currentEpisode.src} ref={audioEl} />;
};
