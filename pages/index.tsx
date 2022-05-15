import Container from "components/Container";
import Day from "components/Day";
import Header from "components/Header";
import LineTemp from "components/LineTemp";
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
          <LineTemp />
        </div>
        <div className="right-col">
          <Sunset />
          <h2>Next 5 days</h2>
          <NextDay icon="1" date="1" weather="1" tempDay="1" tempNight="1" />
        </div>
      </div>
    </Container>
  );
};

export default Home;
