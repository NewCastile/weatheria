import { useTransition } from "@remix-run/react";
import { VStack, useMediaQuery, Stack, Fade, Text } from "@chakra-ui/react";

import ComboBox from "~/components/ComboBox";
import WeatherBadge from "~/components/Weather/WeatherBadge";
import MapIcon from "~/components/Icons/MapIcon";
import { defaultTheme } from "~/themes";

export function ErrorBoundary() {
  return null;
}

export default function Weather() {
  const transition = useTransition();
  const [isSmallerThan600] = useMediaQuery("(max-height: 600px)");

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
        <ComboBox isSubmitting={transition.state !== "idle"} />
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
        <VStack justifyContent={"center"} minW={"250px"} spacing={"6"} w={"full"} zIndex={"modal"}>
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
          <ComboBox endColorToken={"accent"} isSubmitting={transition.state !== "idle"} />
        </VStack>
      </VStack>
    </Stack>
  );
}
