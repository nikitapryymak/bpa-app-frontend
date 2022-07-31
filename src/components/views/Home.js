import { Box, Heading } from "@chakra-ui/react";
import BPATable from "../BPATable";

const Home = () => {
  return (
    <Box>
      <Heading color="gray.100" mb="2rem">
        BASES PER PLATE APPEARANCE
      </Heading>
      <BPATable />
    </Box>
  );
};
export default Home;
