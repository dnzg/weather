/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";
import styled from "styled-components";
import Temperature from "./Temperature";

type NextDayType = {
  icon: string;
  date: number;
  weather: string;
  tempDay: number;
  tempNight: number;
};

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const NextDay = ({ icon, date, weather, tempDay, tempNight }: NextDayType) => {
  const clarifyDate = (epoch: number) => {
    const date = new Date(epoch * 1000);
    return month[date.getMonth()] + " " + date.getDate();
  };

  return icon && date && weather && tempDay && tempNight ? (
    <Wrapper>
      <div className="row align-items-center">
        <div className="circle">
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="weather icon"
          />
        </div>
        <div className="text">
          {clarifyDate(date)}
          <br />
          <b>{weather}</b>
        </div>
        <div className="degrees">
          {Temperature(tempDay)} / {Temperature(tempNight)}
        </div>
      </div>
    </Wrapper>
  ) : (
    <></>
  );
};

const Wrapper = styled.div`
  box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px,
    rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(60 66 87 / 16%) 0px 0px 0px 1px,
    rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px,
    rgb(0 0 0 / 0%) 0px 0px 0px 0px;
  border-radius: 0.25rem;
  margin-top: 1rem;

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

  .text {
    color: rgba(0, 0, 0, 0.5);
    line-height: 1.5;

    b {
      color: rgba(0, 0, 0, 1);
    }
  }

  .degrees {
    margin: 0 0 0 auto;
  }
`;

export default NextDay;
