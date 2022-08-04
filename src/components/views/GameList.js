import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useDeleteGame from "../../hooks/useDeleteGame";
import useGames from "../../hooks/useGames";
import { getGameDate } from "../../utils/utils";
import CardSkeleton from "../skeletons/CardSkeleton";

const GameList = () => {
  const { data: games = [], isLoading, isError } = useGames();
  const navigate = useNavigate();

  const { mutate: removeGame } = useDeleteGame();

  const handleDelete = (id) => async (e) => {
    e.stopPropagation();
    removeGame(id);
  };

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
          <Flex mb=".5rem" align="center">
            <Text mr=".5rem" fontWeight="bold">
              {getGameDate(new Date(game.date))}
            </Text>
            <Text color="orange.300" fontSize="md" fontWeight="bold">
              vs {game.opponent}
            </Text>
            <DeleteIcon
              ml="auto"
              color="gray.700"
              cursor="pointer"
              zIndex={1}
              _hover={{ color: "red.400" }}
              onClick={handleDelete(game.gameId)}
            />
          </Flex>
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
