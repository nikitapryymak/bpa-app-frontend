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
} from "@chakra-ui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import statColumns from "../../constants/dbConstants";
import showMobile from "../../constants/tables";
import usePlayerInfo from "../../hooks/usePlayerInfo";
import { getColorByBPA, getGameDate } from "../../utils/utils";
import InfoSkeleton from "../skeletons/InfoSkeleton";

const PlayerView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const goBack = location.state?.goBack;

  const {
    firstName,
    lastName,
    number,
    stats = [],
    isLoading,
    isError,
  } = usePlayerInfo(id);

  return isLoading ? (
    <InfoSkeleton />
  ) : isError ? (
    <Text color="red.300">Failed to load player</Text>
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
        {firstName} {lastName}
        <Text as="span" ml="1rem" color="blue.300">
          #{number}
        </Text>
      </Heading>
      <Text mb="1em" color="gray.500" fontWeight="bold">
        Recent Games
      </Text>
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
            ".hide-mobile": {
              display: ["none", "none", "table-cell"],
            },
          }}
        >
          <Thead>
            <Tr>
              {statColumns.map((column) => (
                <Th
                  className={showMobile[column] ? "" : "hide-mobile"}
                  key={column}
                >
                  {/* replace these stat columns with other fields */}
                  {column === "Last"
                    ? "date"
                    : column === "First"
                    ? "opponent"
                    : column}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {stats.map((game, i) => (
              <Tr
                color="gray.300"
                key={i}
                onClick={() =>
                  navigate(`/games/${game.gameId}`, {
                    state: { goBack: true },
                  })
                }
                _hover={{
                  bg: "gray.700",
                  cursor: "pointer",
                }}
              >
                <Td fontWeight="bold">{getGameDate(new Date(game.date))}</Td>
                <Td>{game.opponent}</Td>
                <Td className="hide-mobile">{game.PA}</Td>
                <Td className="hide-mobile">{game.AB}</Td>
                <Td className="hide-mobile">{game.H}</Td>
                <Td className="hide-mobile">{game["1B"]}</Td>
                <Td className="hide-mobile">{game["2B"]}</Td>
                <Td className="hide-mobile">{game["3B"]}</Td>
                <Td className="hide-mobile">{game.HR}</Td>
                <Td className="hide-mobile">{game.RBI}</Td>
                <Td className="hide-mobile">{game.R}</Td>
                <Td className="hide-mobile">{game.HBP}</Td>
                <Td className="hide-mobile">{game.ROE}</Td>
                <Td className="hide-mobile">{game.FC}</Td>
                <Td className="hide-mobile">{game.CI}</Td>
                <Td className="hide-mobile">{game.BB}</Td>
                <Td className="hide-mobile">{game.SO}</Td>
                <Td className="hide-mobile">{game.SB}</Td>
                <Td className="hide-mobile">{game.TB}</Td>
                <Td className="hide-mobile">{game.SAC}</Td>
                <Td className="hide-mobile">{game.SF}</Td>
                <Td className="hide-mobile">{game["2OUTRBI"]}</Td>
                <Td className="hide-mobile">{game.HEADSUP}</Td>
                <Td
                  bg={getColorByBPA(game.BPA)}
                  color="gray.800"
                  fontWeight={600}
                >
                  {game.BPA}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};
export default PlayerView;
