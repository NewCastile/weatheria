import { HStack, Text, VStack } from "@chakra-ui/react";

import { formatDate } from "../../helpers/formatDate";
import { IHourForecast } from "../../types";

import ForecastWeatherBox from "./ForecastWeatherBox";
import ForecastWeatherIcon from "./ForecastWeatherIcon";

export default function FirstHourForecast({
  day,
  isLoading,
  unitSymbol,
}: {
  day: IHourForecast;
  isLoading: boolean;
  unitSymbol: string;
}) {
  const [firstForecastDate] = formatDate(day.dt_txt);

  return (
    <>
      <HStack justifyContent={"space-around"} w={"full"}>
        <VStack alignItems={"flex-start"} spacing={"auto"}>
          <Text as={"h1"} fontSize={"1.7rem"} fontWeight={"extrabold"}>
            {day.main.feels_like}
            {unitSymbol}
          </Text>
          <HStack spacing={"2"}>
            <Text
              as={"h2"}
              fontSize={"1.3rem"}
              fontWeight={"semibold"}
              my={"0.4rem"}
              textAlign={"center"}
              w={"full"}
            >
              {day.weather[0].main}
            </Text>
            <ForecastWeatherIcon forecast={day} />
          </HStack>
          <Text as={"small"} casing={"uppercase"} fontWeight={"medium"}>
            {day.weather[0].description}
          </Text>
          <Text as={"small"} fontWeight={"bold"}>
            {firstForecastDate}
          </Text>
        </VStack>
        <VStack
          alignItems={"flex-start"}
          display={{ base: "none", sm: "flex" }}
          fontSize={"small"}
          fontWeight={"medium"}
          spacing={"auto"}
        >
          <Text as={"span"}>
            <Text display={"inline-block"} textDecor={"underline"}>
              Real Feel
            </Text>
            : {day.main.temp}
            {unitSymbol}
          </Text>
          <Text as={"span"}>
            <Text display={"inline-block"} textDecor={"underline"}>
              Humidity
            </Text>
            : {day.main.humidity}%
          </Text>
          <Text as={"span"}>
            <Text display={"inline-block"} textDecor={"underline"}>
              Cloud Clover
            </Text>
            : {day.clouds.all}%
          </Text>
          <Text as={"span"}>
            <Text display={"inline-block"} textDecor={"underline"}>
              Min Temp:
            </Text>{" "}
            {day.main.temp_min}
            {unitSymbol}
          </Text>
          <Text as={"span"}>
            <Text display={"inline-block"} textDecor={"underline"}>
              Max Temp:
            </Text>{" "}
            {day.main.temp_max}
            {unitSymbol}
          </Text>
        </VStack>
      </HStack>
      <ForecastWeatherBox {...{ isLoading }} />
    </>
  );
}
