import { HStack, Image, Stack, Text, VStack } from "@chakra-ui/react";

import WeatherBox from "~/components/Weather/WeatherBox";
import { formatDate } from "~/helpers/formatDate";
import { IHourForecast } from "~/types";

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
          <Image
            alt="weather-icon"
            display={"inline-block"}
            h={"8"}
            src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            w={"8"}
          />
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
    </>
  );
}
