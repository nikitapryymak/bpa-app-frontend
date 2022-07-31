import { useNavigate } from "react-router-dom";
import {
  Container,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { getColorByBPA } from "../utils/utils";
import CrownIcon from "./basic/CrownIcon";
import TableSkeleton from "./skeletons/TableSkeleton";
import useLeaderboard from "../hooks/useLeaderboard";
import statColumns from "../constants/dbConstants";

const BPATable = () => {
  const navigate = useNavigate();
  const { data: leaderboard, isLoading, isError } = useLeaderboard();

  return isLoading ? (
    <TableSkeleton />
  ) : isError ? (
    <Text color="red.300">Failed to load leaderboard</Text>
  ) : (
    <Container w="96vw" maxWidth="1300px">
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
            {leaderboard.map((player, i) => (
              <Tr
                color="gray.300"
                key={player.playerId}
                onClick={() =>
                  navigate(`players/${player.playerId}`, {
                    state: { goBack: true }, // used for logic the back arrow
                  })
                }
                _hover={{
                  bg: "gray.700",
                  cursor: "pointer",
                }}
                _last={{
                  td: {
                    borderBottom: 0,
                  },
                }}
              >
                <Td fontWeight="bold">
                  <Flex justify="center" align="center">
                    {i === 0 && <CrownIcon style={{ marginRight: ".5rem" }} />}
                    {player.Last}
                  </Flex>
                </Td>
                <Td fontWeight="bold">{player.First}</Td>
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
export default BPATable;
