import { SongModel } from "@helpers/song-model";
import styles from "./song.module.scss";
import Image from "next/image";
import { useAudioContext } from "../../contexts/audioContextProvider";
import { useEffect, useState } from "react";

interface Props {
  song: SongModel;
}

const Song = ({ song }: Props) => {
  const {
    currentAudio,
    isPlaying,
    playPause,
    duration,
    progress,
    progressStyle,
  } = useAudioContext();

  const [current, setCurrent] = useState(false);

  useEffect(() => {
    setCurrent(
      currentAudio !== undefined && currentAudio.id_song === song.id_song
    );
  }, [currentAudio]);

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
          src={"/music-background.jpg"}
          width={100}
          height={100}
          alt={song.title}
        />
      </figure>
      <section className={styles.song__center}>
        <h4 className={styles.song__title}>{song.title}</h4>
        <section>
          <input
            type={"range"}
            className={styles.song__progress}
            step={"1"}
            min={"0"}
            max={current ? duration : 0}
            value={current ? progress : 0}
            style={{ background: current ? progressStyle : "" }}
          />
        </section>
      </section>
      <button
        className={`button ${styles.song__play}`}
        onClick={() => playPause(song)}
      >
        {currentAudio?.id_song === song.id_song && isPlaying ? "Pause" : "Play"}
      </button>
    </section>
  );
};

export default Song;
