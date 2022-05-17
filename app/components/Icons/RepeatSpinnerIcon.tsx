import { RepeatIcon } from "@chakra-ui/icons";
import { chakra } from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

export default function RepeatSpinnerIcon() {
  return (
    <ChakraBox
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      }}
    >
      <RepeatIcon />
    </ChakraBox>
  );
}
