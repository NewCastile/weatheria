import { VStack, Text } from "@chakra-ui/react";
import { useTransition } from "@remix-run/react";

import ComboBox from "~/components/ComboBox";
import { defaultTheme } from "~/themes";

export default function WeatherIndex() {
  const transition = useTransition();

  return (
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
  );
}
