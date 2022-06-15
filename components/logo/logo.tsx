import Image from "next/image";
import styles from "./logo.module.scss";
import { Figure } from "react-bootstrap";

const Logo = () => {
  return (
    <Figure className={styles.logo}>
      <Image src={"/logo.png"} alt={"Cutify"} width={192} height={57} />
    </Figure>
  );
};

export default Logo;
