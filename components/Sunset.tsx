import { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import SunsetSVG from "./SunsetSVG";

type SunsetType = {
  sunrise: number;
  sunset: number;
};
const formatAMPM = (epoch: number) => {
  const date = new Date(epoch * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = (hours >= 12 ? "pm" : "am").toUpperCase();

  hours %= 12;
  hours = hours || 12;
  let newMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const strTime = `${hours}:${newMinutes} ${ampm}`;

  return strTime;
};

const Sunset = ({ sunrise, sunset }: SunsetType) => {
  const [sunsetSizes, setSunsetSizes] = useState({ cx: 32, gw: 0 });
  const [time, setTime] = useState({ sunrise: "0", sunset: "0" });
  const now = parseInt((new Date().getTime() / 1000).toFixed(0));

  useEffect(() => {
    // cx=265
    // gw=0;233

    setTime({
      sunrise: formatAMPM(sunrise),
      sunset: formatAMPM(sunset),
    });

    let nowFixed = now - sunrise;
    let sunsetFixed = sunset - sunrise;
    let gw = (nowFixed * 233) / sunsetFixed;
    gw = gw > 0 ? gw : 0;
    setSunsetSizes({ cx: gw + 32, gw });
  }, [sunrise, sunset, now]);

  return (
    <Wrapper>
      <SunsetSVG cx={sunsetSizes.cx} gw={sunsetSizes.gw} />
      <div className="row space-between">
        <div className="time">
          <b>Sunrise</b>
          <br />
          {time.sunrise}
        </div>
        <div className="time">
          <b>Sunset</b>
          <br />
          {time.sunset}
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
