import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Container,
  Heading,
  Text,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  HStack,
} from "@chakra-ui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import statColumns from "../../constants/dbConstants";
import useGameInfo from "../../hooks/useGameInfo";
import { getColorByBPA, getGameDate } from "../../utils/utils";
import InfoSkeleton from "../skeletons/InfoSkeleton";

const SingleGame = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const goBack = location.state?.goBack;

  const { data: gameInfo, isLoading, isError } = useGameInfo(gameId);

  return isLoading ? (
    <InfoSkeleton />
  ) : isError ? (
    <Text mt="4rem" color="red.300">
      Failed to load game
    </Text>
  ) : (
    <Container maxWidth="1300px" align="left">
      <ArrowBackIcon
        mb=".6em"
        boxSize="1.5em"
        cursor="pointer"
        _hover={{ color: "blue.300" }}
        onClick={() => navigate(goBack ? -1 : "/")}
      />
      <Heading size="lg" color="gray.100" mb="1rem">
        {gameInfo.title}
      </Heading>
      <HStack mb="1em">
        <Text color="gray.500" fontWeight="bold">
          {getGameDate(new Date(gameInfo.date))}
        </Text>
        <Text color="orange.300" fontSize="md" fontWeight="bold">
          vs {gameInfo.opponent}
        </Text>
      </HStack>
      <TableContainer
        p=".25rem 0 0"
        border="1px"
        borderRadius="4px"
        borderColor="blue.300"
      >
        <Table
          size="sm"
          variant="simple"
          sx={{
            "th, td": {
              padding: ".5rem",
              textAlign: "center",
            },
            th: {
              color: "orange.300",
            },
          }}
        >
          <Thead>
            <Tr>
              {statColumns.map((heading) => (
                <Th key={heading}>{heading}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {gameInfo.stats.map((player) => (
              <Tr
                color="gray.300"
                key={player.playerId}
                onClick={() =>
                  navigate(`/players/${player.playerId}`, {
                    state: { goBack: true },
                  })
                }
                _hover={{
                  bg: "gray.700",
                  cursor: "pointer",
                }}
              >
                <Td fontWeight="bold">{player.last}</Td>
                <Td fontWeight="bold">{player.first}</Td>
                <Td>{player.PA}</Td>
                <Td>{player.AB}</Td>
                <Td>{player.H}</Td>
                <Td>{player["1B"]}</Td>
                <Td>{player["2B"]}</Td>
                <Td>{player["3B"]}</Td>
                <Td>{player.HR}</Td>
                <Td>{player.RBI}</Td>
                <Td>{player.R}</Td>
                <Td>{player.HBP}</Td>
                <Td>{player.ROE}</Td>
                <Td>{player.FC}</Td>
                <Td>{player.CI}</Td>
                <Td>{player.BB}</Td>
                <Td>{player.SO}</Td>
                <Td>{player.SB}</Td>
                <Td>{player.TB}</Td>
                <Td>{player.SAC}</Td>
                <Td>{player.SF}</Td>
                <Td>{player["2OUTRBI"]}</Td>
                <Td>{player.HEADSUP}</Td>
                <Td
                  bg={getColorByBPA(player.BPA)}
                  color="gray.800"
                  fontWeight={600}
                >
                  {player.BPA}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};
export default SingleGame;
