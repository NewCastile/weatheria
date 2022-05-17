import { chakra } from "@chakra-ui/react";

const ChakraIcon = chakra("svg");

export default function CloudIcon() {
  return (
    <ChakraIcon
      fill="none"
      h={"80"}
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      w={"80"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </ChakraIcon>
  );
}
