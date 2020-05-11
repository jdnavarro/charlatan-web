import { useState, useEffect } from "react";

export const useAudioPlayer = () => {
  const [playing, setPlaying] = useState<boolean>(false);

  useEffect(() => {
    const audio = document.getElementById("audio") as HTMLAudioElement;
    playing ? audio.play() : audio.pause();
  });

  return { playing, setPlaying };
};
