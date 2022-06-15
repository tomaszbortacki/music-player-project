import styled from "styled-components";
import { ReactNode } from "react";

interface Props {
  width: number;
  children: ReactNode | Array<ReactNode>;
}

interface InnerWrapperProps {
  width: number;
}

const OuterWrapper = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerWrapper = styled.section<InnerWrapperProps>`
  width: 100%;
  max-width: ${(props) => props.width}px;
`;

const CenterWrapper = ({ width, children }: Props) => {
  return (
    <OuterWrapper>
      <InnerWrapper width={width}>{children}</InnerWrapper>
    </OuterWrapper>
  );
};

export default CenterWrapper;
