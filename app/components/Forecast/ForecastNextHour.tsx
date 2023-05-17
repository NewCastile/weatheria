import { HStack, Stack, Text, VStack } from "@chakra-ui/react";

import { formatDate } from "../../helpers/formatDate";
import { IHourForecast } from "../../types";

import ForecastWeatherBox from "./ForecastWeatherBox";
import ForecastWeatherIcon from "./ForecastWeatherIcon";

export default function ForecastNextHour({
  day,
  isLoading,
  unitSymbol,
}: {
  day: IHourForecast;
  isLoading: boolean;
  unitSymbol: string;
}) {
  const [_, nextHourForecasteDate, formatedHour] = formatDate(day.dt_txt);

  return (
    <>
      <VStack alignItems={"flex-start"} py={"8"} spacing={"1"}>
        <Text as={"strong"} textAlign={"center"} w={"full"}>
          {day.main.temp}
          {unitSymbol}
        </Text>
        <HStack alignSelf={"center"} spacing={"2"}>
          <Text as={"h3"} fontSize={"1.1rem"} textAlign={"center"} w={"full"}>
            {day.weather[0].main}
          </Text>
          <ForecastWeatherIcon forecast={day} />
        </HStack>
        <Text as={"small"} casing={"uppercase"} fontWeight={"medium"}>
          {day.weather[0].description}
        </Text>
        <Stack direction={{ base: "column", xl: "row" }} spacing={{ base: "0", xl: "2" }}>
          <Text as={"small"} fontWeight={"bold"}>
            {nextHourForecasteDate}
          </Text>
          <Text as={"small"} fontWeight={"bold"}>
            {formatedHour}
          </Text>
        </Stack>
      </VStack>
      <ForecastWeatherBox {...{ isLoading }} />
    </>
  );
}
