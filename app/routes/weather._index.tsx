/** @format */

import { Text, VStack } from "@chakra-ui/react";
import { useNavigation } from "@remix-run/react";

import HUIAsyncComboBox from "../components/HUIComboBox";
import { defaultTheme } from "../themes";

export function ErrorBoundary() {
  return null;
}

export default function WeatherIndex() {
  const navigation = useNavigation();

  return (
    <VStack
      bgColor={"transparent"}
      h={"full"}
      justifyContent={"center"}
      pb={"8"}
      pt={{ base: "24", md: "0" }}
      px={{ base: "2", sm: "10" }}
      w={{ base: "full", lg: "50%" }}
    >
      <VStack justifyContent={"center"} spacing={"6"} w={"full"} zIndex={"modal"}>
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
        <HUIAsyncComboBox endColorToken={"accent"} isSubmitting={navigation.state !== "idle"} />
      </VStack>
    </VStack>
  );
}
