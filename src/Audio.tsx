import React from "react";

import type { Episode } from "./current";

interface Props {
  current: Episode;
  setProgress: (progress: number) => void;
  setDuration: (n: number) => void;
  seekTime: number | null;
  setSeekTime: (n: any) => void;
}

export const Audio: React.FC<Props> = (props) => {
  const { current, setProgress, setDuration, seekTime, setSeekTime } = props;

  const audioEl = React.useRef<HTMLAudioElement>(null);

  React.useEffect(() => {
    if (audioEl.current !== null) {
      const audio = audioEl.current;

      const loadedData = () => {
        setDuration(audio.duration);
        audio.currentTime = current.progress;
      };

      const interval = setInterval(() => {
        if (current.playing) {
          setProgress(audio.currentTime);
        }
      }, 5000);

      current.playing ? audio.play() : audio.pause();

      if (seekTime && seekTime !== current.progress) {
        audio.currentTime = seekTime;
        setProgress(audio.currentTime);
        setSeekTime(null);
      }

      audio.addEventListener("loadeddata", loadedData);

      return () => {
        audio.removeEventListener("loadeddata", loadedData);
        clearInterval(interval);
      };
    }
  });

  return <audio src={current.src} ref={audioEl} />;
};
