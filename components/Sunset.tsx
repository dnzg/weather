import { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import SunsetSVG from "./SunsetSVG";

interface LayoutProps {
  children: ReactNode;
}

const Sunset = () => {
  const [sunsetSizes, setSunsetSizes] = useState({ cx: 32, gw: 0 });

  useEffect(() => {
    // cx=265
    // gw=233
    const gw = 180;
    setSunsetSizes({ cx: gw + 32, gw });
  }, []);

  return (
    <Wrapper>
      <SunsetSVG cx={sunsetSizes.cx} gw={sunsetSizes.gw} />
      <div className="row space-between">
        <div className="time">
          <b>Sunset</b>
          <br />
          06:00 AM
        </div>
        <div className="time">
          <b>Sunrise</b>
          <br />
          06:45 AM
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: fit-content;
  border-radius: 0.25rem;
  padding: 2rem 2rem 1.5rem;
  margin-bottom: 3rem;
  background: #fff;
  box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px,
    rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(60 66 87 / 16%) 0px 0px 0px 1px,
    rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px,
    rgb(0 0 0 / 0%) 0px 0px 0px 0px;

  svg {
    width: 100%;
  }

  .time {
    text-align: center;
    margin: 0.5rem 0.35rem;
    color: rgba(25, 40, 63, 0.5);
    line-height: 1.35;

    b {
      color: rgba(25, 40, 63, 1);
    }
  }
`;

export default Sunset;
