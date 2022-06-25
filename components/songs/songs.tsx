import { useEffect, useState } from "react";
import { SongModel } from "@helpers/song-model";
import Song from "@components/song/song";
import styles from "./songs.module.scss";
import AudioContextProvider from "../../contexts/audioContextProvider";

interface Props {
  songsSerialized?: string;
}

const Songs = ({ songsSerialized }: Props) => {
  const [songs, setSongs] = useState<Array<SongModel>>([]);

  useEffect(() => {
    if (!songsSerialized) return;
    try {
      const parsedSongs = JSON.parse(songsSerialized) as Array<SongModel>;

      setSongs(parsedSongs);
    } catch (e) {
      console.log(e);
    }
  }, [songsSerialized]);

  return (
    <section className={styles.songs}>
      <AudioContextProvider>
        {songs.map((song) => (
          <Song song={song} key={song.id_song} />
        ))}
      </AudioContextProvider>
    </section>
  );
};

export default Songs;
