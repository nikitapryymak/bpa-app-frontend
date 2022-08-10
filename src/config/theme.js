import { extendTheme, theme as baseTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const colors = {
  brand: {
    headingText: `${baseTheme.colors.gray["100"]}`,
    bodyText: `${baseTheme.colors.gray["500"]}`,
    bodyTextHover: `${baseTheme.colors.gray["400"]}`,
    tableText: `${baseTheme.colors.gray["300"]}`,
    blue: `${baseTheme.colors.blue["300"]}`,
    orange: `${baseTheme.colors.orange["300"]}`,
    green: `${baseTheme.colors.green["300"]}`,
    red: `${baseTheme.colors.red["300"]}`,
    bg: `${baseTheme.colors.gray["800"]}`,
    hoverBg: `${baseTheme.colors.gray["700"]}`,
    hoverBgDark: `${baseTheme.colors.gray["900"]}`,
  },
};

const theme = extendTheme({ config, colors });

export default theme;
