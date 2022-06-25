import { useEffect } from "react";
import styles from "./volume.module.scss";
import { useAudioContext } from "../../contexts/audioContextProvider";

const LOCALSTORAGE_ITEM = "cutify_volume";
const GRID = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

const Volume = () => {
  const { volume, setCurrentVolume } = useAudioContext();

  useEffect(() => {
    const prevVolume = Number(localStorage.getItem(LOCALSTORAGE_ITEM));
    setCurrentVolume(prevVolume);
  }, []);

  const changeVolume = (value: number) => {
    setCurrentVolume(value);
    localStorage.setItem(LOCALSTORAGE_ITEM, value.toString());
  };

  return (
    <section className={styles.volume}>
      <span>Volume:</span>
      <section className={styles.volume__wrapper}>
        {GRID.map((value, key) => (
          <button
            onClick={() => changeVolume(value)}
            className={`${styles.volume__bar} ${
              volume >= value ? styles.volume__bar__active : ""
            }`}
            key={key}
          />
        ))}
      </section>
    </section>
  );
};

export default Volume;
