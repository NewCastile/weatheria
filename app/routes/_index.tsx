import { Fade, Stack, Text, VStack, useMediaQuery } from "@chakra-ui/react";
import { useNavigation } from "@remix-run/react";
import { useContext, useEffect } from "react";

import HUIAsyncComboBox from "../components/HUIComboBox";
import MapIcon from "../components/Icons/MapIcon";
import WeatherBadge from "../components/Weather/WeatherBadge";
import { WeatherThemeContext } from "../root";
import { defaultTheme } from "../themes";

export function ErrorBoundary() {
  return null;
}

export default function Weather() {
  const navigation = useNavigation();
  const [isSmallerThan600] = useMediaQuery("(max-height: 600px)");
  const { setTheme: setCurrentTheme } = useContext(WeatherThemeContext);

  useEffect(() => {
    if (!navigation.location) {
      setCurrentTheme(defaultTheme);
    }
  }, [navigation.location, setCurrentTheme]);

  return (
    <Stack
      alignItems={"center"}
      bgImage={"/images/backgrounds/default.jpg"}
      bgPos={"center"}
      bgRepeat={"no-repeat"}
      bgSize={"cover"}
      flexDir={{ base: "column", md: "row" }}
      h={isSmallerThan600 ? { base: "auto", xl: "full" } : { base: "auto", md: "full" }}
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
            hello c:
          </Text>
        </Fade>
      </WeatherBadge>
      <VStack
        bgPos={"center"}
        bgRepeat={"no-repeat"}
        bgSize={"cover"}
        color={"white"}
        display={{ base: "none", lg: "flex" }}
        h={"full"}
        justify={"center"}
        position={"relative"}
        spacing={0}
        w={{ base: "full", md: "50%" }}
      >
        <HUIAsyncComboBox
          endColorToken={defaultTheme.theme.colors["accent"]}
          isSubmitting={navigation.state !== "idle"}
        />
      </VStack>
      <VStack
        bgColor={"transparent"}
        h={"full"}
        justifyContent={"center"}
        minW={"180px"}
        pb={"8"}
        pt={{ base: "24", md: "0" }}
        px={{ base: "2", sm: "10" }}
        w={{ base: "full", lg: "50%" }}
      >
        <VStack justifyContent={"center"} minW={"180px"} spacing={"6"} w={"full"} zIndex={"modal"}>
          <VStack color={"white"} spacing={"-0.5"}>
            <Text
              as={"h1"}
              borderBottom={"4px solid"}
              borderColor={defaultTheme.theme.colors["accent"]}
              color={"hero"}
              fontSize={{ base: "2xl", sm: "5xl", lg: "6xl" }}
              fontWeight={"extrabold"}
              textAlign={"center"}
              w={"full"}
            >
              Welcome to Weatheria
            </Text>
            <Text
              color={defaultTheme.theme.colors["accent"]}
              fontSize={{ base: "normal", sm: "3xl", lg: "4xl" }}
              fontWeight={"bold"}
              textAlign={"center"}
              w={"full"}
            >
              Your new Weather App
            </Text>
          </VStack>
        </VStack>
        <VStack
          display={{ base: "flex", lg: "none" }}
          w={{ base: "full", md: "85%" }}
          zIndex={"modal"}
        >
          <HUIAsyncComboBox
            endColorToken={defaultTheme.theme.colors["accent"]}
            isSubmitting={navigation.state !== "idle"}
          />
        </VStack>
      </VStack>
    </Stack>
  );
}
