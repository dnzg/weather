/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";
import styled from "styled-components";

interface LayoutProps {
  children: ReactNode;
}

const NextDay = () => {
  return (
    <Wrapper>
      <div className="row align-items-center">
        <div className="circle">
          <img
            src="http://openweathermap.org/img/wn/10d@2x.png"
            alt="weather icon"
          />
        </div>
        <div className="text">
          <b>November 10</b>
          <br />
          Cloudly
        </div>
        <div className="degrees">26° / 19°</div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px,
    rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(60 66 87 / 16%) 0px 0px 0px 1px,
    rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px,
    rgb(0 0 0 / 0%) 0px 0px 0px 0px;
  border-radius: 0.25rem;

  .row {
    justify-content: flex-start;
    padding: 0.75rem 1rem;
  }

  .circle {
    width: 3.5em;
    height: 3.5em;
    margin-right: 0.5em;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
    }
  }

  .degrees {
    margin: 0 0 0 auto;
  }
`;

export default NextDay;
