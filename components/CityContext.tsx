import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface WeatherDataType {
  current: {
    weather: { icon: string; description: string; main: string }[];
    temp: number;
    pressure: number;
    humidity: number;
  };
  daily: { temp: { night: number }; sunrise: number; sunset: number }[];
}

interface CityContextType {
  weatherData: WeatherDataType;
  tempFormat: string;
  setWeatherData: Dispatch<SetStateAction<WeatherDataType>>;
  setTempFormat: Dispatch<SetStateAction<string>>;
}

const CityContext = createContext<CityContextType>({} as CityContextType);

export function CityWrapper({ children }: { children: any }) {
  const [weatherData, setWeatherData] = useState<WeatherDataType>(
    {} as WeatherDataType
  );
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
