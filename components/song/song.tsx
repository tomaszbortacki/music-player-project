import { SongModel } from "@helpers/song-model";
import styles from "./song.module.scss";
import Image from "next/image";
import { useAudioContext } from "../../contexts/audioContextProvider";
import { useEffect, useState } from "react";

interface Props {
  song: SongModel;
  closeButton?: boolean;
}

const Song = ({ song, closeButton }: Props) => {
  const {
    currentAudio,
    isPlaying,
    playPause,
    duration,
    progress,
    progressStyle,
    changeProgress,
    startTimer,
    removeAudio,
  } = useAudioContext();

  const [current, setCurrent] = useState(false);
  const [time, setTime] = useState<string>();

  useEffect(() => {
    setCurrent(
      currentAudio !== undefined && currentAudio.id_song === song.id_song
    );
  }, [currentAudio]);

  useEffect(() => {
    if (current) {
      if (duration - progress < 0) {
        setTime("0:00");
        return;
      }

      const minutes = Math.floor((duration - progress) / 60);
      let seconds =
        duration - progress - Math.floor((duration - progress) / 60) * 60;

      setTime(
        `${minutes}:${
          seconds < 10 ? `0${seconds.toFixed(0)}` : seconds.toFixed(0)
        }`
      );
    } else {
      setTime(undefined);
    }
  }, [current, duration, progress]);

  return (
    <section className={styles.song}>
      <figure
        className={`${styles.song__image} ${
          currentAudio?.id_song === song.id_song && isPlaying
            ? styles.song__image__playing
            : ""
        }`}
      >
        <Image
          src={song.Miniature.path}
          width={100}
          height={100}
          alt={song.title}
        />
      </figure>
      <section className={styles.song__center}>
        <h4 className={styles.song__title}>{song.title}</h4>
        {current && (
          <section className={styles.song__progress__wrapper}>
            <input
              type={"range"}
              className={styles.song__progress}
              step={"1"}
              min={"0"}
              max={duration}
              value={progress}
              onChange={(e) => changeProgress(Number(e.target.value))}
              onMouseUp={startTimer}
              onKeyUp={startTimer}
              style={{ background: progressStyle }}
            />
            {time && (
              <span className={styles.song__progress__time}>{time}</span>
            )}
          </section>
        )}
      </section>
      <button
        className={`button ${styles.song__play}`}
        onClick={() => playPause(song)}
      >
        {current && isPlaying ? "Pause" : "Play"}
      </button>
      {closeButton && (
        <button className={`button close`} onClick={removeAudio} />
      )}
    </section>
  );
};

export default Song;
