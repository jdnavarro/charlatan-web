import { useState, useEffect } from "react";

export default () => {
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const audio = document.getElementById("audio") as HTMLAudioElement;
    playing ? audio.play() : audio.pause();
  });

  return { playing, setPlaying };
};
