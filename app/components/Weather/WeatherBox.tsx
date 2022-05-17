import { chakra, ChakraProps } from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
import { useContext } from "react";

import { WeatherThemeContext } from "~/root";
import { defaultTheme } from "~/themes";

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

const WeatherBox: React.FC<
  {
    endColorToken: string;
    isLoading: boolean;
    style?: React.CSSProperties;
  } & ChakraProps
> = ({ isLoading, endColorToken, style, children, ...props }) => {
  const { theme: currentTheme } = useContext(WeatherThemeContext);
  const variants = {
    idle: {
      background: [
        `${defaultTheme.theme.colors[endColorToken]}`,
        endColorToken.match("#") ? endColorToken : `${currentTheme.theme.colors[endColorToken]}`,
      ],
    },
    onChange: {
      background: [
        `${currentTheme?.theme.colors[endColorToken]}`,
        `${defaultTheme.theme.colors[endColorToken]}`,
      ],
    },
  };

  return endColorToken.length ? (
    <MotionBox
      animate={isLoading ? "onChange" : "idle"}
      style={style}
      variants={variants}
      {...props}
    >
      {children}
    </MotionBox>
  ) : (
    <MotionBox style={style} {...props}>
      {children}
    </MotionBox>
  );
};

export default WeatherBox;
