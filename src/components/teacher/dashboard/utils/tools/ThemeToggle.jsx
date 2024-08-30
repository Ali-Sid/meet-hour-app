import React from "react";
import { Switch, useColorMode, Icon, Box } from "@chakra-ui/react";
import { GoSun } from "react-icons/go";
import { IoMoonOutline } from "react-icons/io5";

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box display='flex' flexDirection='row' alignItems='center' gap={5} transition="background-color 0.3s ease">
      {colorMode === "light" && (
        <Icon as={IoMoonOutline} boxSize={5} />
      )}
      <Switch
      isChecked={colorMode === "light"}
      onChange={toggleColorMode}
      size="lg"
      colorScheme="teal"
      boxShadow="0 2px 5px rgba(0, 0, 0, 0.5)"
      borderRadius="25px"
      transition="all 0.3s ease"
    />
    {colorMode === "dark" && (
        <Icon as={GoSun} boxSize={5} />
      )}
    </Box>
  );
};

export default ThemeToggle;
