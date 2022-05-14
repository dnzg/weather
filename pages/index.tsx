import Container from "components/Container";
import Day from "components/Day";
import Header from "components/Header";
import NextDay from "components/NextDay";
import Sunset from "components/Sunset";
import type { NextPage } from "next";
import Image from "next/image";

const Home: NextPage = () => {
  // tCels = (5/9)*(tFar-32)

  return (
    <Container>
      <Header />
      <div className="row" style={{ marginTop: "2rem" }}>
        <div className="left-col">
          <Day />
        </div>
        <div className="right-col">
          <Sunset />
          <h2>Weather Prediction / 5 days</h2>
          <NextDay />
        </div>
      </div>
    </Container>
  );
};

export default Home;
