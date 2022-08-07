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
import showMobile from "../constants/tables";

const BPATable = () => {
  const navigate = useNavigate();
  const { data: leaderboard, isLoading, isError } = useLeaderboard();

  return isLoading ? (
    <TableSkeleton />
  ) : isError ? (
    <Text color="red.300">Failed to load leaderboard</Text>
  ) : (
    <Container w="100%" maxWidth="1300px" p="0">
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
