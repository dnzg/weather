import Container from "components/Container";
import Day from "components/Day";
import Header from "components/Header";
import NextDay from "components/NextDay";
import Sunset from "components/Sunset";
import type { NextPage } from "next";
import { useCityContext } from "components/CityContext";
import Preloader from "components/Preloader";

const Home: NextPage = () => {
  const { weatherData } = useCityContext();

  return (
    <Container>
      {Object.keys(weatherData).length === 0 && <Preloader />}
      <Header />
      <div
        className="row rowMain"
        style={{
          marginTop: "2rem",
          marginLeft: "-1rem",
          marginRight: "-1rem",
        }}
      >
        <div className="col">
          {weatherData.current && (
            <>
              <h2>Today</h2>

              <Day
                icon={weatherData.current.weather[0].icon}
                currentTemp={weatherData.current.temp}
                nightTemp={weatherData.daily[0].temp.night}
                description={weatherData.current.weather[0].description}
                pressure={weatherData.current.pressure}
                humidity={weatherData.current.humidity}
                main={weatherData.current.weather[0].main}
              />
            </>
          )}
        </div>
        <div className="col">
          {weatherData.daily && (
            <>
              <h2>Next 5 days</h2>

              {weatherData.daily.slice(1, 6).map((day: any, idx: number) => (
                <NextDay
                  icon={day.weather[0].icon}
                  date={day.dt}
                  weather={day.weather[0].description}
                  tempDay={day.temp.day}
                  tempNight={day.temp.night}
                  key={idx}
                />
              ))}
            </>
          )}
        </div>
        <div className="col">
          {weatherData.daily && weatherData.daily[0] && (
            <>
              <h2>Sun</h2>
              <Sunset
                sunrise={weatherData.daily[0].sunrise}
                sunset={weatherData.daily[0].sunset}
              />
            </>
          )}
        </div>
      </div>
      <footer>made in 2099 by dnzg.dev</footer>
    </Container>
  );
};

export default Home;
