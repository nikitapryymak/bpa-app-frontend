import { Flex, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      p={5}
      justify="center"
      align="center"
      height="5rem"
      pos="absolute"
      bottom={0}
      w="100%"
    >
      <Text fontSize="md" color="brand.bodyText">
        Made by{" "}
        <Link
          color="brand.blue"
          isExternal
          href="https://github.com/nikitapryymak"
        >
          Nikita
        </Link>
      </Text>
    </Flex>
  );
};
export default Footer;
