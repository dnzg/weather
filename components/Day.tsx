/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import Temperature from "./Temperature";
import getPicture from "utils/getPic";
import { useEffect, useState } from "react";

type DayType = {
  icon: string;
  currentTemp: number;
  nightTemp: number;
  description: string;
  pressure: number;
  humidity: number;
  main: string;
};

const Day = ({
  icon,
  currentTemp,
  nightTemp,
  description,
  pressure,
  humidity,
  main,
}: DayType) => {
  const [bg, setBg] = useState("");

  useEffect(() => {
    async function get() {
      setBg(await getPicture(main));
    }
    get();
  }, [main]);

  return (
    <Wrapper style={{ backgroundImage: "url(" + bg + ")" }}>
      <div className="overlay"></div>
      <div className="content">
        <div className="header row">
          <div className="circle">
            <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt="weather icon"
            />
          </div>
          <div className="text">
            <b>Weather</b>
            <br />
            What&apos;s the weather?
          </div>
        </div>
        <div className="degree">
          <div className="row">
            <span className="day">{Temperature(currentTemp)}</span>
            <span className="night">Night: {Temperature(nightTemp)}</span>
          </div>
          <div>{description}</div>
          <div className="row">
            <div className="info">
              Pressure
              <br />
              <span>{pressure}mb</span>
            </div>
            <div className="info humidity">
              Humidity
              <br />
              <span>{humidity}%</span>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 0.25rem;
  padding: 2rem;
  position: relative;
  box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px,
    rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(60 66 87 / 16%) 0px 0px 0px 1px,
    rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px,
    rgb(0 0 0 / 0%) 0px 0px 0px 0px;
  color: #fff;

  .overlay {
    position: absolute;
    z-index: 0;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    background-color: rgba(25, 40, 63, 0.75);
  }

  .content {
    position: relative;
    z-index: 2;
  }

  .header {
    justify-content: flex-start;

    .circle {
      background: rgba(255, 255, 255, 0.25);
      width: 2.75em;
      height: 2.75em;
      border-radius: 100%;
      margin-right: 0.5em;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
      }
    }

    .text {
      font-size: 0.9em;
      line-height: 1.25;

      b {
        font-size: 1.15em;
      }
    }
  }

  .degree {
    margin-top: 1.5rem;

    .row {
      align-items: center;
      justify-content: flex-start;
    }

    .day {
      font-size: 4em;
    }

    .night {
      background: rgba(255, 255, 255, 0.25);
      margin-left: 1em;
      padding: 0.45em 0.85em;
      border-radius: 0.45rem;
    }

    .info {
      margin-top: 2rem;
      width: 100%;
      background: rgba(25, 40, 63, 1);
      text-align: center;
      padding: 1rem;
      color: rgba(255, 255, 255, 0.5);
      border-radius: 0.25rem;

      span {
        font-size: 2em;
        color: rgba(255, 255, 255, 1);
      }
    }
    .humidity {
      margin-left: 1rem;
      color: rgba(25, 40, 63, 0.5);
      background: #fff;

      span {
        color: rgba(25, 40, 63, 1);
      }
    }
  }
`;

export default Day;
