import Image from "next/image";
import styles from "./logo.module.scss";
import { Figure } from "react-bootstrap";

interface Props {
  type: "normal" | "small";
  relative?: boolean;
}

type TYPE = Record<
  string,
  {
    url: string;
    width: number;
    height: number;
  }
>;

const IMAGE_TYPE: TYPE = {
  normal: {
    url: "/logo.png",
    width: 192,
    height: 57,
  },
  small: {
    url: "/logo-small.png",
    width: 118,
    height: 34,
  },
};

const Logo = ({ relative, type }: Props) => {
  return (
    <Figure className={!relative ? styles.logo : ""}>
      <Image
        src={IMAGE_TYPE[type].url}
        alt={"Cutify"}
        width={IMAGE_TYPE[type].width}
        height={IMAGE_TYPE[type].height}
      />
    </Figure>
  );
};

export default Logo;
