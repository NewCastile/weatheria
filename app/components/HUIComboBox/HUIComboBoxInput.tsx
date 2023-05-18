/** @format */

import { chakra } from "@chakra-ui/react";
import { ComboboxInputProps, Combobox as HUIComboBox } from "@headlessui/react";
import { forwardRef } from "react";

import { suggestionToString } from "../../helpers/suggestionToString";
import { ISuggestion } from "../../types";

const { Input: HUIInput } = HUIComboBox;

const ForwardedHUIComboBoxInput = forwardRef<
  HTMLInputElement,
  ComboboxInputProps<"input", ISuggestion>
>(({ ...props }, ref) => {
  return (
    <HUIInput ref={ref} displayValue={(city) => suggestionToString(city)} name={"q"} {...props} />
  );
});

ForwardedHUIComboBoxInput.displayName = "HUIComboBoxInput";

const HUIComboBoxInput = chakra(ForwardedHUIComboBoxInput, {
  baseStyle: {
    _focusVisible: { border: "none" },
    _placeholder: { color: "gray", fontWeight: "bold" },
    border: "none",
    fontSize: { base: "normal", md: "md" },
    fontWeight: "bold",
    w: "full",
    name: "q",
  },
});

export default HUIComboBoxInput;
