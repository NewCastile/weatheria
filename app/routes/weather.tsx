import { Fade, Stack, Text, VStack, useMediaQuery } from "@chakra-ui/react";
import { Outlet, useMatches, useNavigation } from "@remix-run/react";
import { useContext, useEffect, useState } from "react";

import HUIAsyncComboBox from "../components/HUIComboBox";
import MapIcon from "../components/Icons/MapIcon";
import WeatherBadge from "../components/Weather/WeatherBadge";
import { WeatherThemeContext } from "../root";
import { defaultTheme } from "../themes";
import { IForecastLoaderData } from "../types";

export function ErrorBoundary() {
  return null;
}

export default function Weather() {
  const navigation = useNavigation();
  const matches = useMatches();
  const [__, base, child] = matches;
  const { theme: currentTheme, setTheme: setCurrentTheme } = useContext(WeatherThemeContext);
  const [badgeContent, setBadgeContent] = useState<string>("hello c:");
  const [isSmallerThan600] = useMediaQuery("(max-height: 600px)");
  const onHomePage = base.pathname.replace(/\//g, "").match(child.pathname.replace(/\//g, ""));

  useEffect(() => {
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
  }, [child.data, matches, setCurrentTheme]);

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
      <WeatherBadge isLoading={navigation.state !== "idle"}>
        <MapIcon />
        <Fade in={navigation.state === "idle"}>
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
        <HUIAsyncComboBox
          endColorToken={"accent"}
          isSubmitting={navigation.state === "submitting"}
        />
      </VStack>
      <Outlet />
    </Stack>
  );
}
