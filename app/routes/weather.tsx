import { Outlet, useMatches, useTransition } from "@remix-run/react";
import { VStack, useMediaQuery, Stack, Fade, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import { IForecastLoaderData } from "~/types";
import ComboBox from "~/components/ComboBox";
import WeatherBadge from "~/components/Weather/WeatherBadge";
import MapIcon from "~/components/Icons/MapIcon";
import { defaultTheme } from "~/themes";
import { WeatherThemeContext } from "~/root";

export function ErrorBoundary() {
  return null;
}

export default function Weather() {
  const transition = useTransition();
  const matches = useMatches();
  const [__, base, child] = matches;
  const { theme: currentTheme, setTheme: setCurrentTheme } = useContext(WeatherThemeContext);
  const [badgeContent, setBadgeContent] = useState<string>("hello c:");
  const [isSmallerThan600] = useMediaQuery("(max-height: 600px)");
  const onHomePage = base.pathname.replace(/\//g, "").match(child.pathname.replace(/\//g, ""));

  useEffect(() => {
    if (onHomePage) {
      setBadgeContent("hello c:");
      setCurrentTheme(defaultTheme);

      return;
    }
    try {
      const {
        weather: { city },
      } = child.data as IForecastLoaderData;

      setBadgeContent(`${city.name}, ${city.country}`);
    } catch (error) {
      setCurrentTheme(defaultTheme);
      setBadgeContent(`sorry :c`);

      return;
    }
  }, [matches]);

  return (
    <Stack
      alignItems={"center"}
      bgImage={`/images/backgrounds/${currentTheme.condition || "default"}.jpg`}
      bgPos={"center"}
      bgRepeat={"no-repeat"}
      bgSize={"cover"}
      flexDir={"row"}
      h={
        isSmallerThan600
          ? { base: "auto", xl: "full" }
          : { base: "auto", md: "max-content", lg: "full" }
      }
      justifyContent={"center"}
      minH={"full"}
      spacing={0}
    >
      <WeatherBadge isLoading={transition.state !== "idle"}>
        <MapIcon />
        <Fade in={transition.state === "idle"}>
          <Text
            as={"small"}
            color={"black"}
            display={"inline-block"}
            fontWeight={"bold"}
            marginLeft={"0.5rem"}
          >
            {badgeContent}
          </Text>
        </Fade>
      </WeatherBadge>
      <VStack
        bgImage={{
          base: undefined,
          xl: onHomePage ? undefined : `/images/backgrounds/${currentTheme.condition}.jpg`,
        }}
        bgPos={"center"}
        bgRepeat={"no-repeat"}
        bgSize={"cover"}
        color={"white"}
        display={{ base: "none", lg: "flex" }}
        h={"full"}
        justify={"center"}
        position={"relative"}
        spacing={0}
        w={"50%"}
      >
        <ComboBox isSubmitting={transition.state !== "idle"} />
      </VStack>
      <Outlet />
    </Stack>
  );
}
