/** @format */
import { chakra } from "@chakra-ui/react";
import { ComboboxOptionsProps, Combobox as HUIComboBox } from "@headlessui/react";
import { forwardRef } from "react";

const { Options: HUIOptions } = HUIComboBox;

const ForwardedHUIComboBoxOptions = forwardRef<HTMLUListElement, ComboboxOptionsProps<"div">>(
  ({ children, ...props }, ref) => {
    return (
      <HUIOptions ref={ref} {...props}>
        {children}
      </HUIOptions>
    );
  },
);

ForwardedHUIComboBoxOptions.displayName = "HUIComboBoxOptions";
const HUIComboBoxOptions = chakra(ForwardedHUIComboBoxOptions, {
  baseStyle: {
    alignItems: "flex-start",
    bgColor: "white",
    borderRadius: "0rem 1.5rem 1.5rem 1.5rem",
    display: "flex",
    flexDir: "column",
    maxW: "320px",
    p: "5",
    position: "absolute",
    py: 2,
    top: "full",
  },
});

export default HUIComboBoxOptions;
