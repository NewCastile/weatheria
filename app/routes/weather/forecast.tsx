import { useLoaderData, useTransition } from "@remix-run/react";
import { VStack, Text, Box, useMediaQuery, Flex } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { json, LoaderFunction, MetaFunction } from "remix";

import { IForecastLoaderData } from "~/types";
import WeatherBox from "~/components/Weather/WeatherBox";
import ComboBox from "~/components/ComboBox";
import ForecastGrid from "~/components/Forecast";
import { WeatherThemeContext } from "~/root";

import { defaultTheme, themes } from "../../themes";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const city = url.searchParams.get("city");

  try {
    const weather = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${
        city ? city : "Toledo, Castile-La Mancha, ES"
      }&units=metric&appid=${process.env.WEATHER_API_KEY}`,
    )
      .then((response) => {
        return response.json();
      })
      .catch((reason) => {
        throw new Error(reason);
      });
    const { cod } = weather;

    if (cod === "404") throw new Error("City not found");

    return json<IForecastLoaderData>({ weather, unitSymbol: "°C" });
  } catch (err) {
    console.error(err);
  }
};

export const meta: MetaFunction = () => {
  return {
    charset: "utf-8",
    title: `Weatheria`,
    viewport: "width=device-width,initial-scale=1",
  };
};

export function ErrorBoundary({ error }: { error: any }) {
  const transition = useTransition();
  const [isSmallerThan500] = useMediaQuery("(max-width: 500px)");

  return (
    <WeatherBox
      alignItems={"center"}
      alignSelf={"center"}
      display={"flex"}
      endColorToken={defaultTheme.theme.colors["primary"]}
      flexDir={"column"}
      h={"full"}
      isLoading={transition.state !== "idle"}
      justifyContent={"center"}
      minW={"180px"}
      px={"10"}
      w={{ base: "full", lg: "50%" }}
    >
      <VStack justifyContent={"center"} minW={"250px"} spacing={"6"} w={"full"} zIndex={"modal"}>
        <VStack display={{ base: "flex", lg: "none" }} w={"85%"} zIndex={"modal"}>
          <ComboBox endColorToken={"accent"} isSubmitting={transition.state !== "idle"} />
        </VStack>
        <VStack color={"white"} spacing={"-0.5"}>
          <Text
            as={"h1"}
            borderBottom={"4px solid"}
            borderColor={defaultTheme.theme.colors["primary"]}
            color={defaultTheme.theme.colors["hero"]}
            fontSize={isSmallerThan500 ? "3xl" : "6xl"}
            fontWeight={"extrabold"}
            textAlign={"center"}
            w={"full"}
          >
            {error.message.match("FetchError") ? "Connection error" : "No data was found"}
          </Text>
          <Text
            color={"accent"}
            fontSize={isSmallerThan500 ? "lg" : "3xl"}
            fontWeight={"bold"}
            textAlign={"center"}
            w={"full"}
          >
            Please try {error.message.match("FetchError") ? "again" : "another place"}
          </Text>
        </VStack>
      </VStack>
      <Box
        bgImage={"/images/backgrounds/default.jpg"}
        bgPos={"center"}
        bgRepeat={"no-repeat"}
        bgSize={"cover"}
        h={"full"}
        left={"0"}
        position={"absolute"}
        top={"0"}
        w={"full"}
      />
    </WeatherBox>
  );
}

export default function Forecast() {
  const transition = useTransition();
  const { weather, unitSymbol } = useLoaderData() as IForecastLoaderData;
  const { setTheme } = useContext(WeatherThemeContext);

  useEffect(() => {
    if (transition.state === "submitting" || transition.state === "loading") {
      //
    } else if (transition.state === "idle") {
      const currentCondition = weather.list[0].weather[0].main.toLowerCase();

      const [newTheme] = themes.filter((theme) => theme.condition.match(currentCondition));

      setTheme(newTheme);

      return;
    }
  }, [weather, transition.state]);

  return (
    <Flex
      bgColor={{ base: "transparent", lg: "secondary" }}
      className={"forecast"}
      h={{ base: "max-content", lg: "full" }}
      justifyContent={{ base: "start", sm: "center", xl: "center" }}
      minW={"180px"}
      pb={"8"}
      pt={{ base: "24", lg: "0" }}
      px={"10"}
      w={{ base: "full", lg: "50%" }}
    >
      <VStack justifyContent={"center"} minW={"250px"} spacing={"6"} w={"full"} zIndex={"modal"}>
        <Text
          as={"h1"}
          borderBottom={"4px solid"}
          borderColor={"accent"}
          color={"hero"}
          fontSize={"3rem"}
          fontWeight={"extrabold"}
          textAlign={"center"}
          w={"max-content"}
        >
          Today
        </Text>
        <VStack display={{ base: "flex", lg: "none" }} w={"85%"} zIndex={"modal"}>
          <ComboBox isSubmitting={transition.state !== "idle"} />
        </VStack>
        {weather.list && weather.list.length && (
          <ForecastGrid
            forecasts={weather}
            isLoading={transition.state !== "idle"}
            unit={unitSymbol}
          />
        )}
      </VStack>
    </Flex>
  );
}
