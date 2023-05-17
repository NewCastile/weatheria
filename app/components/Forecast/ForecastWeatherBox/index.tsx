/** @format */

import ForecastWeatherBoxShadow from "../ForecastWeatherBox/ForecastWeatherBoxShadow";
import ForecastWeatherBoxSurface from "../ForecastWeatherBox/ForecastWeatherBoxSurface";

const ForecastWeatherBox = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <>
      <ForecastWeatherBoxSurface {...{ isLoading }} />
      <ForecastWeatherBoxShadow {...{ isLoading }} />
    </>
  );
};

export default ForecastWeatherBox;
