import styles from "./search.module.scss";
import debounce from "lodash.debounce";

interface Props {
  searchSong: (value: string) => void;
}

const Search = ({ searchSong }: Props) => {
  const search = debounce((value: string) => {
    searchSong(value);
  }, 500);

  return (
    <section className={styles.search}>
      <input
        type={"text"}
        className={styles.search__input}
        placeholder={"Search"}
        onChange={(e) => search(e.target.value)}
      />
    </section>
  );
};

export default Search;
