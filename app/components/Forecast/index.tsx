import { Grid, GridItem, Skeleton } from "@chakra-ui/react";

import { IForecast } from "../../types";

import ForecastFirstHour from "./ForecastFirstHour";
import ForecastNextHour from "./ForecastNextHour";

export default function ForecastGrid({
  forecasts,
  unit,
  isLoading,
}: {
  forecasts: IForecast;
  unit: string;
  isLoading: boolean;
}) {
  return (
    <Grid
      gap={"6"}
      gridAutoFlow={"row"}
      gridTemplateColumns={{ base: "1fr", lg: "repeat(2, minmax(0, 1fr))" }}
      maxW={"530px"}
      width={"80%"}
      zIndex={"hide"}
    >
      {forecasts.list.slice(0, 5).map((day, dayIdx) => {
        return dayIdx === 0 ? (
          <GridItem
            key={dayIdx}
            colSpan={{ base: 1, sm: 2 }}
            position={"relative"}
            w={"full"}
            zIndex={0}
          >
            <Skeleton
              borderRadius={"lg"}
              h={"full"}
              isLoaded={!isLoading}
              px={"8"}
              py={"4"}
              w={"full"}
            >
              <ForecastFirstHour day={day} isLoading={isLoading} unitSymbol={unit} />
            </Skeleton>
          </GridItem>
        ) : (
          <GridItem
            key={dayIdx}
            alignItems={"center"}
            display={"flex"}
            flexDir={"row"}
            h={"full"}
            justifyContent={"center"}
            position={"relative"}
            w={"full"}
            zIndex={0}
          >
            <Skeleton borderRadius={"lg"} isLoaded={!isLoading} px={"8"} w={"full"}>
              <ForecastNextHour day={day} isLoading={isLoading} unitSymbol={unit} />
            </Skeleton>
          </GridItem>
        );
      })}
    </Grid>
  );
}
