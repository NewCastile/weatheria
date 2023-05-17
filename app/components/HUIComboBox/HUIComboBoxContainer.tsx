/** @format */

import { ReactElement } from "react";

import WeatherBox from "../Weather/WeatherBox";

const HUIComboboxContainer = ({
  children,
  isSubmitting,
  endColorToken,
}: {
  children: ReactElement | ReactElement[];
  isSubmitting: boolean;
  endColorToken?: string;
}) => {
  return (
    <WeatherBox
      alignItems={"center"}
      borderRadius={"full"}
      color={"black"}
      display={"flex"}
      endColorToken={endColorToken || "secondary"}
      flexDir={"row"}
      isLoading={isSubmitting}
      justifyContent={"center"}
      position={"relative"}
      px={"6"}
      py={"4"}
      w={{ base: "full", md: "85%" }}
      zIndex={"modal"}
    >
      {children}
    </WeatherBox>
  );
};

export default HUIComboboxContainer;
