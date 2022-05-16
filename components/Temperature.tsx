import { useCityContext } from "./CityContext";

const Temperature = (num: number) => {
  const { tempFormat } = useCityContext();

  return typeof num === "number" ? (
    tempFormat === "F" ? (
      (32 + ((num - 273.15) * 9) / 5).toFixed(0) + "℉"
    ) : (
      (num - 273.15).toFixed(0) + "℃"
    )
  ) : (
    <></>
  );
};

export default Temperature;
