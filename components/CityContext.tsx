import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface CityContextType {
  weatherData: object;
  tempFormat: string;
  setWeatherData: Dispatch<SetStateAction<object>>;
  setTempFormat: Dispatch<SetStateAction<string>>;
}

const CityContext = createContext<CityContextType>({} as CityContextType);

export function CityWrapper({ children }: { children: any }) {
  const [weatherData, setWeatherData] = useState<object>({});
  const [tempFormat, setTempFormat] = useState<string>("F");

  return (
    <CityContext.Provider
      value={{
        weatherData,
        setWeatherData,
        tempFormat,
        setTempFormat,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

export function useCityContext() {
  return useContext(CityContext);
}
