import { useEffect, useMemo, useState } from "react";
import styles from "./volume.module.scss";
import { useAudioContext } from "../../contexts/audioContextProvider";
import Image from "next/image";

const LOCALSTORAGE_ITEM = "cutify_volume";

const Volume = () => {
  const { volume, setCurrentVolume } = useAudioContext();
  const [volumeBG, setVolumeBG] = useState<string>();

  useEffect(() => {
    const prevVolume = Number(localStorage.getItem(LOCALSTORAGE_ITEM)) || 0.1;
    setCurrentVolume(prevVolume);
  }, []);

  useEffect(() => {
    const percentage = volume * 100;
    setVolumeBG(
      `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${percentage}%, #474747), color-stop(${percentage}%, rgba(71, 71, 71, 0.1)))`
    );
  }, [volume]);

  const changeVolume = useMemo(() => {
    return (value: number) => {
      setCurrentVolume(value);
      localStorage.setItem(LOCALSTORAGE_ITEM, value.toString());
    };
  }, []);

  return (
    <section className={styles.volume}>
      <Image src={"/volume.svg"} width={30} height={30} alt={"volume"} />
      <input
        className={styles.volume__progress}
        type={"range"}
        min={0.01}
        step={0.001}
        max={1}
        value={volume}
        onChange={(e) => changeVolume(Number(e.target.value))}
        style={{ background: volumeBG }}
      />
    </section>
  );
};

export default Volume;
