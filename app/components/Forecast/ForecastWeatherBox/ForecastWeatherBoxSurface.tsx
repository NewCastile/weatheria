/** @format */

import WeatherBox from "../../../components/Weather/WeatherBox";

const ForecastWeatherBoxSurface = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <WeatherBox
      borderRadius={"lg"}
      endColorToken={"primary"}
      h={"full"}
      isLoading={isLoading}
      left={"0"}
      position={"absolute"}
      top={"0"}
      w={"full"}
      zIndex={"-10"}
    />
  );
};

export default ForecastWeatherBoxSurface;
