import styled from "styled-components";
import Input from "./Input";
import { useCityContext } from "./CityContext";

const Header = () => {
  const { tempFormat, setTempFormat } = useCityContext();

  return (
    <div className="row">
      <Input defaultCity="Limassol" />
      <Temps className="row">
        <div
          className={tempFormat === "F" ? "" : "selected"}
          onClick={() => setTempFormat("F")}
        >
          ℉
        </div>
        <div
          className={tempFormat === "C" ? "" : "selected"}
          onClick={() => setTempFormat("C")}
        >
          ℃
        </div>
      </Temps>
    </div>
  );
};

export default Header;

const Temps = styled.div`
  width: auto;
  margin: 0 1rem 0 auto;

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
