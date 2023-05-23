import { Image as ChakraImage } from "@chakra-ui/react";

import { IHourForecast } from "../../types";

const ForecastWeatherIcon = ({ forecast }: { forecast: IHourForecast }) => {
  const [{ icon: forecastIcon }] = forecast.weather;

  return (
    <ChakraImage
      alt="weather-icon"
      display={"inline-block"}
      h={"8"}
      src={`http://openweathermap.org/img/wn/${forecastIcon}@2x.png`}
      w={"8"}
    />
  );
};

export default ForecastWeatherIcon;
