import type { ReactNode } from "react";
import styled from "styled-components";

interface LayoutProps {
  children: ReactNode;
}

const Container = ({ children }: LayoutProps) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  max-width: 1280px;
  width: 95%;
  margin: 3rem auto;
`;

export default Container;
