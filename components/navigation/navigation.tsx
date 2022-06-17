import { Container } from "react-bootstrap";
import Logo from "@components/logo/logo";
import Link from "next/link";
import Image from "next/image";
import styles from "./navigation.module.scss";

interface Props {
  id_user: string;
}

const Navigation = ({ id_user }: Props) => {
  return (
    <section className={styles.navigation}>
      <Container fluid={true}>
        <section className={styles.navigation__wrapper}>
          <Link href={"/"}>
            <a title={"Cutify"}>
              <Logo type={"small"} />
            </a>
          </Link>
          <section className={styles.navigation__actions}>
            <Link href={`/user/${id_user}`}>
              <a title={"Profile"}>
                <Image
                  src={"/user.svg"}
                  width={24}
                  height={24}
                  alt={"Profile"}
                />
              </a>
            </Link>
            <Link href={`/logout`}>
              <a title={"Logout"}>
                <Image
                  src={"/logout.svg"}
                  width={24}
                  height={24}
                  alt={"Logout"}
                />
              </a>
            </Link>
          </section>
        </section>
      </Container>
    </section>
  );
};

export default Navigation;
