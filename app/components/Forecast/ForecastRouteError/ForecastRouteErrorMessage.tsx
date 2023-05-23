import { Text, useMediaQuery } from "@chakra-ui/react";

const ForecastRouteErrorMessage = ({ message, data }: { message?: string; data: any }) => {
  const [isSmallerThan500] = useMediaQuery("(max-width: 500px)");

  return (
    <Text
      color={"accent"}
      fontSize={isSmallerThan500 ? "lg" : "3xl"}
      fontWeight={"bold"}
      textAlign={"center"}
      w={"full"}
    >
      {message ?? data}
    </Text>
  );
};

export default ForecastRouteErrorMessage;
