import { useEffect, useMemo, useState } from "react";
import { SongModel } from "@helpers/song-model";
import Song from "@components/song/song";
import styles from "./songs.module.scss";
import Volume from "@components/volume/volume";
import Search from "@components/search/search";
import { getSongs } from "@database/endpoints";
import { errorHandler } from "@helpers/error-handler";
import { useAudioContext } from "../../contexts/audioContextProvider";
import Pagination from "@components/pagination/pagination";
import { PAGE_LIMIT } from "@helpers/pagination";

interface Props {
  songsSerialized?: string;
  count?: number;
}

const Songs = ({ songsSerialized, count }: Props) => {
  const [songsLength, setSongsLength] = useState(count || 0);
  const [songs, setSongs] = useState<Array<SongModel>>([]);
  const [currentPage, setCurrentPage] = useState(0);
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

  const search = useMemo(() => {
    return (value: string, page: number = 0) => {
      getSongs(value, page)
        .then(({ songs, count }) => {
          setSongs(songs);
          setCurrentPage(page);
          setSongsLength(count);
        })
        .catch(errorHandler);
    };
  }, []);

  const setPage = useMemo(() => {
    return (page: number) => {
      search("", page);
    };
  }, []);

  return (
    <section className={styles.songs}>
      <section className={styles.songs__wrapper}>
        <Search searchSong={search} />
        <Volume />
      </section>
      {songs.map((song) => (
        <Song song={song} key={song.id_song} />
      ))}
      <section className={styles.songs__wrapper}>
        {songsLength && songsLength > songs.length && (
          <Pagination
            pages={Math.ceil(songsLength - PAGE_LIMIT)}
            setPage={setPage}
            currentPage={currentPage}
          />
        )}
      </section>
      {currentAudio && (
        <section className={styles.songs__fixed}>
          <Song song={currentAudio} closeButton={true} />
        </section>
      )}
    </section>
  );
};

export default Songs;
