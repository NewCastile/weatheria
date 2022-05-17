/** @format */

import { SearchIcon } from "@chakra-ui/icons";
import { chakra, Input, StackDivider, useMediaQuery, VStack } from "@chakra-ui/react";
import { Combobox as ReachCombobox, ComboboxInput, ComboboxPopover } from "@reach/combobox";
import { Form, useFetcher } from "@remix-run/react";
import { useState } from "react";

import WeatherBox from "~/components/Weather/WeatherBox";
import { ISuggestion } from "~/types";

import RepeatSpinnerIcon from "../Icons/RepeatSpinnerIcon";

import ComboBoxOption from "./ComboBoxOption";

const ChakraComboboxInput = chakra(ComboboxInput);
const ChakraComboboxPopover = chakra(ComboboxPopover);
const ChakraForm = chakra(Form);

export default function ComboBox({
  isSubmitting,
  endColorToken,
}: {
  isSubmitting: boolean;
  endColorToken?: string;
}) {
  const cities = useFetcher();
  const [city, setCity] = useState<string>("");
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");

  return (
    <WeatherBox
      alignItems={"center"}
      borderRadius={"full"}
      color={"black"}
      display={"flex"}
      endColorToken={endColorToken || "secondary"}
      flexDir={"row"}
      isLoading={isSubmitting}
      justifyContent={"center"}
      position={"relative"}
      px={"6"}
      py={"4"}
      w={{ base: "full", md: "85%" }}
      zIndex={"modal"}
    >
      <cities.Form action="/city-search" autoComplete="off" method="get" style={{ width: "100%" }}>
        <ReachCombobox
          aria-label="Cities"
          onSelect={(location) => {
            setCity(location);
          }}
        >
          <ChakraComboboxInput
            _placeholder={{ color: "gray", fontWeight: "bold" }}
            fontSize={{ base: "normal", md: "md" }}
            fontWeight={"bold"}
            name="q"
            placeholder={`Type a city ${isSmallerThan600 ? "" : "eg: Lancaster"}`}
            w={"full"}
            onChange={(event) => {
              setCity(event.target.value);
              cities.submit(event.target.form);
            }}
          />
          {cities.data ? (
            <ChakraComboboxPopover portal={false} zIndex={"popover"}>
              {cities.data.length ? (
                <VStack
                  alignItems={"flex-start"}
                  bgColor={"white"}
                  borderRadius={"0rem 1.5rem 1.5rem 1.5rem"}
                  display={{ base: "none", sm: "flex" }}
                  divider={<StackDivider borderColor="gray.200" />}
                  maxW={"320px"}
                  p={"5"}
                  position={"absolute"}
                  top={"full"}
                  w={"full"}
                >
                  {cities.data.map((city: ISuggestion, cityIdx: number) => (
                    <ComboBoxOption key={cityIdx} city={city} />
                  ))}
                </VStack>
              ) : null}
            </ChakraComboboxPopover>
          ) : null}
        </ReachCombobox>
      </cities.Form>
      <ChakraForm action="/weather/forecast" method="get" ml={"2"}>
        <Input name="city" size={"md"} type="hidden" value={city} />
        <button type="submit">{isSubmitting ? <RepeatSpinnerIcon /> : <SearchIcon />}</button>
      </ChakraForm>
    </WeatherBox>
  );
}
