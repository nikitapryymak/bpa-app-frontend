import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import useDeleteGame from "../../hooks/useDeleteGame";
import useGames from "../../hooks/useGames";
import { getGameDate, isAuthed } from "../../utils/utils";
import SearchInput from "../basic/SearchInput";
import CardSkeleton from "../skeletons/CardSkeleton";

const GameList = () => {
  const navigate = useNavigate();
  const authed = isAuthed();
  const [search, setSearch] = useState("");
  const { data: games = [], isLoading, isError } = useGames();

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
      <Text color="brand.red">Failed to load player</Text>
    </Container>
  ) : (
    <Container>
      <SearchInput
        search={search}
        setSearch={setSearch}
        mb="2em"
        marginLeft="auto"
        maxW="250px"
      />
      {games
        .filter((g) => g.title.toLowerCase().includes(search))
        .map((game) => (
          <Box
            key={game.gameId}
            textAlign="left"
            borderWidth="2px"
            borderColor="brand.hoverBg"
            borderRadius="lg"
            p="1rem"
            mb="1.2rem"
            cursor="pointer"
            _hover={{ bg: "brand.hoverBgDark" }}
            onClick={() =>
              navigate(`/games/${game.gameId}`, { state: { goBack: true } })
            }
          >
            <Flex mb=".5rem" align="center">
              <Text mr=".5rem" fontWeight="bold">
                {getGameDate(new Date(game.date))}
              </Text>
              <Text color="brand.orange" fontSize="md" fontWeight="bold">
                vs {game.opponent}
              </Text>
              {authed && (
                <DeleteIcon
                  ml="auto"
                  color="brand.hoverBg"
                  cursor="pointer"
                  zIndex={1}
                  _hover={{ color: "red.400" }}
                  onClick={handleDelete(game.gameId)}
                />
              )}
            </Flex>
            <Text as="span" color="brand.bodyText">
              {game.title}
            </Text>
          </Box>
        ))}
      {games.length === 0 && <Text>No games found</Text>}
    </Container>
  );
};
export default GameList;
