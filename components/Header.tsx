import styled from "styled-components";
import type { ReactNode } from "react";

const Header = () => {
  return (
    <HeaderContainer>
      <Temps>
        <div>F</div>
        <div>C</div>
      </Temps>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div``;

const Temps = styled.div`
  div {
    background: #e98540;
    box-shadow: 0 7px 10px rgb(233 133 64 / 25%);
    border-radius: 1rem;
    width: 3rem;
    height: 3rem;
    color: #fff;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;
