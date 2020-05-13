import { useState, useEffect } from "react";

export const useAudioPlayer = () => {
  const [duration, setDuration] = useState(0);
  const [curTime, setCurTime] = useState(0);
  const [seekTime, setSeekTime] = useState<number | null>(null);

  const [playing, setPlaying] = useState<boolean>(false);

  useEffect(() => {
    const audio = document.getElementById("audio") as HTMLAudioElement;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurTime(audio.currentTime);
    };

    const setAudioTime = () => {
      setCurTime(audio.currentTime);
    };

    audio.addEventListener("loadeddata", setAudioData);

    audio.addEventListener("timeupdate", setAudioTime);

    playing ? audio.play() : audio.pause();

    if (seekTime && seekTime !== curTime) {
      audio.currentTime = seekTime;
      setSeekTime(null);
    }

    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    };
  });

  return {
    playing,
    setPlaying,
    duration,
    curTime,
    setSeekTime,
  };
};
