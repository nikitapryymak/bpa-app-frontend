import { Box, Heading } from "@chakra-ui/react";
import BPATable from "../BPATable";

const Leaderboard = () => {
  return (
    <Box>
      <Heading color="gray.100" mb="2rem">
        BASES PER PLATE APPEARANCE
      </Heading>
      <BPATable />
    </Box>
  );
};
export default Leaderboard;
