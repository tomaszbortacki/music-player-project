import styled from "styled-components";
import styles from "./header.module.scss";

interface Placement {
  placement: "left" | "center" | "right";
}

interface Props extends Placement {
  text: string;
}

const StyledHeader = styled.h2<Placement>`
  text-align: ${(props) => props.placement};
`;

const Header = ({ text, placement }: Props) => {
  return (
    <StyledHeader className={styles.header} placement={placement}>
      {text}
    </StyledHeader>
  );
};

export default Header;
