/** @format */

import { Flex, Text, VStack, useMediaQuery } from "@chakra-ui/react";
import {
  V2_MetaFunction,
  isRouteErrorResponse,
  useLoaderData,
  useNavigation,
  useRouteError,
} from "@remix-run/react";
import { LoaderFunction, json } from "@remix-run/server-runtime";
import { useContext, useEffect } from "react";

import ForecastGrid from "../components/Forecast";
import ForecastRouteErrorBackground from "../components/Forecast/ForecastRouteError/ForecastRouteErrorBackground";
import ForecastRouteErrorContainer from "../components/Forecast/ForecastRouteError/ForecastRouteErrorContainer";
import ForecastRouteErrorMessage from "../components/Forecast/ForecastRouteError/ForecastRouteErrorMessage";
import ForecastRouteErrorStatus from "../components/Forecast/ForecastRouteError/ForecastRouteErrorStatus";
import HUIAsyncComboBox from "../components/HUIComboBox";
import { WeatherThemeContext } from "../root";
import { themes } from "../themes";
import { IForecastLoaderData } from "../types";

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
    // eslint-disable-next-line no-console
    console.error(err);

    return null;
  }
};

export const meta: V2_MetaFunction = () => {
  return [
    {
      charset: "utf-8",
    },
    {
      title: `Weatheria`,
    },
    {
      name: "viewport",
      content: "width=device-width,initial-scale=1",
    },
  ];
};

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <ForecastRouteErrorContainer>
        <VStack justifyContent={"center"} minW={"180px"} spacing={"6"} w={"full"} zIndex={"modal"}>
          <VStack color={"white"} spacing={"-0.5"}>
            <ForecastRouteErrorStatus status={error.status} />
            <ForecastRouteErrorMessage data={error.data} message={error.error?.message} />
          </VStack>
        </VStack>
        <ForecastRouteErrorBackground />
      </ForecastRouteErrorContainer>
    );
  } else if (error instanceof Error) {
    return (
      <ForecastRouteErrorContainer>
        <VStack justifyContent={"center"} minW={"180px"} spacing={"6"} w={"full"} zIndex={"modal"}>
          <VStack color={"white"} spacing={"-0.5"}>
            <ForecastRouteErrorStatus status={400} />
            <ForecastRouteErrorMessage data={error.stack} message={error.name} />
          </VStack>
        </VStack>
        <ForecastRouteErrorBackground />
      </ForecastRouteErrorContainer>
    );
  } else {
    return <h1>Unkown error</h1>;
  }
}

export default function Forecast() {
  const navigation = useNavigation();
  const { weather, unitSymbol } = useLoaderData() as IForecastLoaderData;
  const { setTheme } = useContext(WeatherThemeContext);
  const [isDisplayingInBrowser] = useMediaQuery("(display-mode: browser)");

  useEffect(() => {
    if (navigation.state === "idle") {
      const currentCondition = weather.list[0].weather[0].main.toLowerCase();

      const [newTheme] = themes.filter((theme) => theme.condition.match(currentCondition));

      setTheme(newTheme);

      return;
    } else {
      //
    }
  }, [weather, navigation.state, setTheme]);

  return (
    <Flex
      bgColor={{ base: "transparent", lg: "secondary" }}
      h={{ base: "max-content", lg: "full" }}
      justifyContent={{ base: "start", sm: "center", xl: "center" }}
      minW={"180px"}
      pb={"8"}
      pt={{ base: isDisplayingInBrowser ? "24" : "0", lg: "0" }}
      w={{ base: "full", lg: "50%" }}
    >
      <VStack justifyContent={"center"} minW={"180px"} spacing={"6"} w={"full"} zIndex={"modal"}>
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
          <HUIAsyncComboBox isSubmitting={navigation.state !== "idle"} />
        </VStack>
        {weather.list && weather.list.length && (
          <ForecastGrid
            forecasts={weather}
            isLoading={navigation.state !== "idle"}
            unit={unitSymbol}
          />
        )}
      </VStack>
    </Flex>
  );
}
