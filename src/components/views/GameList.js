import { Box, Container, HStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useGames from "../../hooks/useGames";
import { getGameDate } from "../../utils/utils";
import CardSkeleton from "../skeletons/CardSkeleton";

const GameList = () => {
  const { data: games = [], isLoading, isError } = useGames();
  const navigate = useNavigate();

  return isLoading ? (
    <Container>
      <CardSkeleton cards={3} />
    </Container>
  ) : isError ? (
    <Container>
      <Text color="red.300">Failed to load player</Text>
    </Container>
  ) : (
    <Container>
      {games.map((game) => (
        <Box
          key={game.gameId}
          textAlign="left"
          borderWidth="2px"
          borderColor="gray.700"
          borderRadius="lg"
          p="1rem"
          mb="1.2rem"
          cursor="pointer"
          _hover={{ bg: "gray.900" }}
          onClick={() =>
            navigate(`/games/${game.gameId}`, { state: { goBack: true } })
          }
        >
          <HStack mb=".5rem">
            <Text fontWeight="bold">{getGameDate(new Date(game.date))}</Text>
            <Text color="orange.300" fontSize="md" fontWeight="bold">
              vs {game.opponent}
            </Text>
          </HStack>
          <Text as="span" color="gray.500">
            {game.title}
          </Text>
        </Box>
      ))}
      {games.length === 0 && <Text>No games found</Text>}
    </Container>
  );
};
export default GameList;
