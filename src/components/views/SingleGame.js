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
import showMobile from "../../constants/tables";
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
    <Text mt="4rem" color="brand.red">
      Failed to load game
    </Text>
  ) : (
    <Container maxWidth="1300px" align="left" mb="2rem">
      <ArrowBackIcon
        mb=".6em"
        boxSize="1.5em"
        cursor="pointer"
        _hover={{ color: "brand.blue" }}
        onClick={() => navigate(goBack ? -1 : "/")}
      />
      <Heading size="lg" color="brand.headingText" mb="1rem">
        {gameInfo.title}
      </Heading>
      <HStack mb="1em">
        <Text color="brand.bodyText" fontWeight="bold">
          {getGameDate(new Date(gameInfo.date))}
        </Text>
        <Text color="brand.orange" fontSize="md" fontWeight="bold">
          vs {gameInfo.opponent}
        </Text>
      </HStack>
      <TableContainer
        p=".25rem 0 0"
        border="1px"
        borderRadius="4px"
        borderColor="brand.blue"
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
              color: "brand.orange",
            },
            ".hide-mobile": {
              display: ["none", "none", "table-cell"],
            },
          }}
        >
          <Thead>
            <Tr>
              {statColumns.map((heading) => (
                <Th
                  className={showMobile[heading] ? "" : "hide-mobile"}
                  key={heading}
                >
                  {heading}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {gameInfo.stats.map((player) => (
              <Tr
                color="brand.tableText"
                key={player.playerId}
                onClick={() =>
                  navigate(`/players/${player.playerId}`, {
                    state: { goBack: true },
                  })
                }
                _hover={{
                  bg: "brand.hoverBg",
                  cursor: "pointer",
                }}
              >
                <Td fontWeight="bold">{player.last}</Td>
                <Td fontWeight="bold">{player.first}</Td>
                <Td className="hide-mobile">{player.PA}</Td>
                <Td className="hide-mobile">{player.AB}</Td>
                <Td className="hide-mobile">{player.H}</Td>
                <Td className="hide-mobile">{player["1B"]}</Td>
                <Td className="hide-mobile">{player["2B"]}</Td>
                <Td className="hide-mobile">{player["3B"]}</Td>
                <Td className="hide-mobile">{player.HR}</Td>
                <Td className="hide-mobile">{player.RBI}</Td>
                <Td className="hide-mobile">{player.R}</Td>
                <Td className="hide-mobile">{player.HBP}</Td>
                <Td className="hide-mobile">{player.ROE}</Td>
                <Td className="hide-mobile">{player.FC}</Td>
                <Td className="hide-mobile">{player.CI}</Td>
                <Td className="hide-mobile">{player.BB}</Td>
                <Td className="hide-mobile">{player.SO}</Td>
                <Td className="hide-mobile">{player.SB}</Td>
                <Td className="hide-mobile">{player.TB}</Td>
                <Td className="hide-mobile">{player.SAC}</Td>
                <Td className="hide-mobile">{player.SF}</Td>
                <Td className="hide-mobile">{player["2OUTRBI"]}</Td>
                <Td className="hide-mobile">{player.HEADSUP}</Td>
                <Td
                  bg={getColorByBPA(player.BPA)}
                  color="brand.bg"
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
