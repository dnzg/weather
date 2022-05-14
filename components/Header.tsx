import styled from "styled-components";
import type { ReactNode } from "react";
import Input from "./Input";

const Header = () => {
  return (
    <div className="row">
      <Input />
      <Temps className="row">
        <div>℉</div>
        <div className="selected">℃</div>
      </Temps>
    </div>
  );
};

export default Header;

const Temps = styled.div`
  width: auto;
  margin: 0 0 0 auto;

  div {
    background: #f97f29;
    color: #fff;
    box-shadow: 0 7px 10px rgb(233 133 64 / 25%);
    border-radius: 1rem;
    width: 3rem;
    height: 3rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0 0 0.25rem;
    cursor: default;
  }

  .selected {
    background: transparent;
    color: #333;
    box-shadow: 0 0 0 rgb(233 133 64 / 25%);
    cursor: pointer;
  }
`;
