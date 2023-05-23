/** @format */

import { useNavigation } from "@remix-run/react";

import { defaultTheme } from "../../../themes";
import WeatherBox from "../../Weather/WeatherBox";

const ForecastRouteErrorContainer = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) => {
  const navigation = useNavigation();

  return (
    <WeatherBox
      alignItems={"center"}
      alignSelf={"center"}
      display={"flex"}
      endColorToken={defaultTheme.theme.colors["primary"]}
      flexDir={"column"}
      h={"full"}
      isLoading={navigation.state !== "idle"}
      justifyContent={"center"}
      px={"10"}
      w={{ base: "full", lg: "50%" }}
    >
      {children}
    </WeatherBox>
  );
};

export default ForecastRouteErrorContainer;
