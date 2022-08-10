import { Box, List, ListItem, Text } from "@chakra-ui/react";
import { useState } from "react";
import useRecentOpponents from "../hooks/useRecentOpponents";
import LoadingSpinner from "./basic/LoadingSpinner";

const RecentOpponents = ({ setGameInfo }) => {
  const [showRecents, setShowRecents] = useState(false);

  const {
    data: opponents = [],
    isLoading,
    isError,
  } = useRecentOpponents({ enabled: showRecents, staleTime: Infinity });

  const initSetGameInfo = (opponent) => () => {
    setGameInfo((prev) => ({ ...prev, opponent }));
    setShowRecents(false);
  };

  return (
    <Box w="100%">
      {!showRecents && (
        <Text
          color="brand.bodyText"
          mt=".5em"
          cursor="pointer"
          _hover={{ color: "brand.orange" }}
          onClick={() => setShowRecents(true)}
        >
          Show Recents
        </Text>
      )}
      {showRecents && (
        <>
          {isLoading ? (
            <LoadingSpinner mt="1.75em" />
          ) : isError ? (
            <Text color="brand.red" mt=".75em">
              Failed to load recent opponents
            </Text>
          ) : (
            <List w="100%" spacing={0}>
              {opponents.map((opponent) => (
                <ListItem
                  key={opponent}
                  border="1px solid"
                  borderColor="brand.hoverBg"
                  p=".25em"
                  cursor="pointer"
                  _hover={{ bg: "brand.hoverBg" }}
                  onClick={initSetGameInfo(opponent)}
                >
                  {opponent}
                </ListItem>
              ))}
            </List>
          )}
        </>
      )}
    </Box>
  );
};
export default RecentOpponents;
