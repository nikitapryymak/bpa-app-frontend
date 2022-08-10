import { SearchIcon } from "@chakra-ui/icons";
import { Box, Input, InputGroup, InputRightElement } from "@chakra-ui/react";

const SearchInput = ({ search, setSearch, ...props }) => {
  return (
    <Box {...props}>
      <InputGroup variant="filled">
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
        <InputRightElement children={<SearchIcon color="blue.300" />} />
      </InputGroup>
    </Box>
  );
};
export default SearchInput;
