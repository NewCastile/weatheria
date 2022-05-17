import WeatherBox from "./WeatherBox";

const WeatherBadge: React.FC<{ isLoading: boolean }> = ({ isLoading, children }) => {
  return (
    <WeatherBox
      alignItems={"center"}
      alignSelf={"self-start"}
      borderRadius={"lg"}
      color={"black"}
      display={"flex"}
      endColorToken={"secondary"}
      flexDir={"row"}
      isLoading={isLoading}
      justifyContent={"center"}
      left={"4"}
      position={"fixed"}
      px={"4"}
      py={"2"}
      top={"3"}
      zIndex={"popover"}
    >
      {children}
    </WeatherBox>
  );
};

export default WeatherBadge;
