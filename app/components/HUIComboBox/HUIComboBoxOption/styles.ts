/** @format */

import { ChakraProps } from "@chakra-ui/react";

const ComboBoxItemDefaultStyles: ChakraProps = {
  alignItems: "flex-start",
  cursor: "pointer",
  display: "flex",
  flexDir: "column",
  justifyContent: "center",
  pl: "4",
  w: "full",
  _hover: {
    borderLeftWidth: "0.3rem",
    borderLeftColor: "gray.600",
    fontSize: "1.1rem",
  },
};

const ComboBoxItemHighlightedStyles: ChakraProps = {
  borderLeftWidth: "0.3rem",
  borderLeftColor: "cyan.300",
  paddingLeft: "0.6rem",
};

const getComboBoxItemStyles = (isActive: boolean): ChakraProps => {
  return isActive
    ? Object.assign({}, ComboBoxItemDefaultStyles, ComboBoxItemHighlightedStyles)
    : ComboBoxItemDefaultStyles;
};

export default getComboBoxItemStyles;
