/** @format */
import { chakra } from "@chakra-ui/react";
import { ComboboxOptionProps, Combobox as HUIComboBox } from "@headlessui/react";
import { forwardRef } from "react";

import { ISuggestion } from "../../../types";

const { Option: HUIOption } = HUIComboBox;

const ForwardedHUIComboBoxOption = forwardRef<
  HTMLLIElement,
  ComboboxOptionProps<"li", ISuggestion>
>(({ children, ...props }, ref) => {
  return (
    <HUIOption ref={ref} {...props}>
      {children}
    </HUIOption>
  );
});

ForwardedHUIComboBoxOption.displayName = "HUIComboBoxOption";

const HUIComboBoxOption = chakra(ForwardedHUIComboBoxOption, {
  baseStyle: { width: "full" },
});

export default HUIComboBoxOption;
