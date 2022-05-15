/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";
import styled from "styled-components";

type NextDayType = {
  icon: string;
  date: string;
  weather: string;
  tempDay: string;
  tempNight: string;
};

const NextDay = ({ icon, date, weather, tempDay, tempNight }: NextDayType) => {
  return icon && date && weather && tempDay && tempNight ? (
    <Wrapper>
      <div className="row align-items-center">
        <div className="circle">
          <img
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="weather icon"
          />
        </div>
        <div className="text">
          <b>{date}</b>
          <br />
          {weather}
        </div>
        <div className="degrees">
          {tempDay}° / {tempNight}°
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

  .degrees {
    margin: 0 0 0 auto;
  }
`;

export default NextDay;
