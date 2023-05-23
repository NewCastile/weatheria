/** @format */

import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Input as ChakraInput,
  Spinner,
  Text,
  VStack,
  chakra,
  useMediaQuery,
} from "@chakra-ui/react";
import { Combobox as HUIComboBox } from "@headlessui/react";
import { Form, useFetcher } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";

import { suggestionToString } from "../../helpers/suggestionToString";
import { loader } from "../../routes/search-city";
import { ISuggestion } from "../../types";

import HUIComboboxContainer from "./HUIComboBoxContainer";
import HUIComboBoxInput from "./HUIComboBoxInput";
import HUIComboBoxOption from "./HUIComboBoxOption";
import getComboBoxItemStyles from "./HUIComboBoxOption/styles";
import HUIComboBoxOptions from "./HUIComboBoxOptions";

const ChakraForm = chakra(Form);

export default function HUIAsyncComboBox({
  isSubmitting,
  endColorToken,
}: {
  isSubmitting: boolean;
  endColorToken?: string;
}) {
  const cities = useFetcher<typeof loader>();

  const [query, setQuery] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<ISuggestion>({ country: "", name: "" });
  const [isSmallerThan300] = useMediaQuery("(max-width: 300px)");
  const selectedCityQuery = useMemo(() => {
    return suggestionToString(selectedCity, "ASC");
  }, [selectedCity]);

  useEffect(() => {
    setQuery(selectedCityQuery);
  }, [selectedCityQuery]);

  return (
    <HUIComboboxContainer {...{ isSubmitting, endColorToken }}>
      <cities.Form
        action={"/search-city"}
        autoComplete={"off"}
        method={"GET"}
        style={{ width: "100%" }}
      >
        <HUIComboBox value={selectedCity} onChange={setSelectedCity}>
          <HUIComboBoxInput
            placeholder={`Type a city ${isSmallerThan300 ? "" : "eg: Lancaster"}`}
            onChange={(event) => {
              setQuery(event.target.value);
              cities.submit(event.target.form);
            }}
          />
          <>
            {cities.data ? (
              cities.data.error ? null : cities.data.length ? (
                <HUIComboBoxOptions w={{ base: "max-content", sm: "full" }}>
                  <VStack as={"ul"} listStyleType={"none"} py={"2"} spacing={"2"} w={"full"}>
                    {cities.data.map((city: ISuggestion, cityIdx: number) => (
                      <HUIComboBoxOption key={cityIdx} value={city}>
                        {({ active }) => (
                          <VStack spacing={"0"} {...getComboBoxItemStyles(active)}>
                            <Text as={"strong"} lineHeight={"5"}>
                              {city.name},{" "}
                            </Text>
                            <Text as={"span"} lineHeight={"5"}>
                              {city.country}
                            </Text>
                            <Text alignSelf={"self-start"}>{city.state}</Text>
                          </VStack>
                        )}
                      </HUIComboBoxOption>
                    ))}
                  </VStack>
                </HUIComboBoxOptions>
              ) : null
            ) : null}
          </>
        </HUIComboBox>
      </cities.Form>
      <ChakraForm action={"/weather/forecast"} method={"GET"} ml={"2"}>
        <ChakraInput name={"city"} size={"md"} type={"hidden"} value={query} />
        <Button type={"submit"} variant={"unstyled"}>
          {isSubmitting ? <Spinner /> : <SearchIcon />}
        </Button>
      </ChakraForm>
    </HUIComboboxContainer>
  );
}
