import { useEffect, useState } from "react";
import { SongModel } from "@helpers/song-model";
import Song from "@components/song/song";
import styles from "./songs.module.scss";
import Volume from "@components/volume/volume";
import Search from "@components/search/search";
import { getSongs } from "@database/endpoints";
import { errorHandler } from "@helpers/error-handler";
import { useAudioContext } from "../../contexts/audioContextProvider";

interface Props {
  songsSerialized?: string;
  count?: number;
}

const Songs = ({ songsSerialized, count }: Props) => {
  const [songs, setSongs] = useState<Array<SongModel>>([]);
  const { currentAudio } = useAudioContext();

  useEffect(() => {
    if (!songsSerialized) return;
    try {
      const parsedSongs = JSON.parse(songsSerialized) as Array<SongModel>;

      setSongs(parsedSongs);
    } catch (e) {
      console.log(e);
    }
  }, [songsSerialized]);

  const search = (value: string) => {
    getSongs(value)
      .then((data) => {
        setSongs(data);
      })
      .catch(errorHandler);
  };

  return (
    <section className={styles.songs}>
      <section className={styles.songs__top}>
        <Search searchSong={search} />
        <Volume />
      </section>
      {songs.map((song) => (
        <Song song={song} key={song.id_song} />
      ))}
      <span className={"text-center"}>
        {songs.length} - {count}
      </span>
      {currentAudio && (
        <section className={styles.songs__fixed}>
          <Song song={currentAudio} closeButton={true} />
        </section>
      )}
    </section>
  );
};

export default Songs;
