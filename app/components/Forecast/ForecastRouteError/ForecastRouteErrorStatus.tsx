import { Text, useMediaQuery } from "@chakra-ui/react";

import { defaultTheme } from "../../../themes";

const ForecastRouteErrorStatus = ({ status }: { status: number }) => {
  const [isSmallerThan500] = useMediaQuery("(max-width: 500px)");

  return (
    <Text
      as={"h1"}
      borderBottom={"4px solid"}
      borderColor={defaultTheme.theme.colors["primary"]}
      color={defaultTheme.theme.colors["hero"]}
      fontSize={isSmallerThan500 ? "3xl" : "6xl"}
      fontWeight={"extrabold"}
      textAlign={"center"}
      w={"full"}
    >
      Error {status}
    </Text>
  );
};

export default ForecastRouteErrorStatus;
