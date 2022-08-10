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
      color="brand.bodyText"
      fontSize="2xl"
      mb="1.25rem"
    >
      <ChakraNavLink to="/">
        <CGLogo />
      </ChakraNavLink>
      <ChakraNavLink
        to="/"
        _hover={{ color: "brand.bodyTextHover" }}
        _activeLink={{ color: "brand.blue" }}
      >
        Leaderboard
      </ChakraNavLink>
      <ChakraNavLink
        to="/games"
        _hover={{ color: "brand.bodyTextHover" }}
        _activeLink={{ color: "brand.blue" }}
        end
      >
        Games
      </ChakraNavLink>
    </HStack>
  );
};
export default Navbar;
