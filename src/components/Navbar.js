import { chakra, HStack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import CGLogo from "./basic/CGLogo";

const ChakraNavLink = chakra(NavLink);

const Navbar = () => {
  return (
    <HStack
      dir="row"
      spacing={6}
      justifyContent="center"
      fontSize="2xl"
      mb="1.25rem"
    >
      <ChakraNavLink to="/">
        <CGLogo />
      </ChakraNavLink>
      <ChakraNavLink
        to="/"
        color="gray.500"
        _hover={{ color: "gray.400" }}
        _activeLink={{ color: "blue.300" }}
      >
        Leaderboard
      </ChakraNavLink>
      <ChakraNavLink
        to="/games"
        color="gray.500"
        _hover={{ color: "gray.400" }}
        _activeLink={{ color: "blue.300" }}
        end
      >
        Games
      </ChakraNavLink>
    </HStack>
  );
};
export default Navbar;
