/** @format */

import { ComboboxOption as ReachComboboxOption } from "@reach/combobox";
import { chakra, Text } from "@chakra-ui/react";

import { ISuggestion } from "~/types";

const ChakraComboboxOption = chakra(ReachComboboxOption);

export default function ComboBoxOption({ city }: { city: ISuggestion }) {
  const optionValue = `${city.name}, ${city.state ? `${city.state}, ` : ""}${city.country}`;

  return (
    <ChakraComboboxOption
      _highlighted={{
        borderLeft: "0.3rem solid",
        borderLeftColor: "hero",
        paddingLeft: "0.6rem",
      }}
      _hover={{
        borderLeftWidth: "0.3rem",
        borderLeftColor: "gray.600",
        fontSize: "1.1rem",
      }}
      alignItems={"flex-start"}
      cursor={"pointer"}
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      pl={"4"}
      value={optionValue}
      w={"full"}
    >
      <Text as={"strong"} lineHeight={"5"}>
        {city.name},{" "}
      </Text>
      <Text as={"span"} lineHeight={"5"}>
        {city.country}
      </Text>
      <Text alignSelf={"self-start"}>{city.state}</Text>
    </ChakraComboboxOption>
  );
}
