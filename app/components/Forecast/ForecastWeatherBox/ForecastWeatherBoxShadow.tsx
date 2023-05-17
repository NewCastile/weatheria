/** @format */

import WeatherBox from "../../../components/Weather/WeatherBox";

const ForecastWeatherBoxShadow = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <WeatherBox
      borderRadius={"lg"}
      endColorToken={"accent"}
      h={"full"}
      isLoading={isLoading}
      left={"2"}
      position={"absolute"}
      top={"2"}
      w={"full"}
      zIndex={"-20"}
    />
  );
};

export default ForecastWeatherBoxShadow;
