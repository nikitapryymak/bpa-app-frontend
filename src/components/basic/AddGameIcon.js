import { AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const AddGameIcon = () => {
  const navigate = useNavigate();

  return (
    <AddIcon
      pos="absolute"
      top="1rem"
      right="1rem"
      cursor="pointer"
      color="green.300"
      _hover={{ color: "green.500" }}
      onClick={() => navigate("/add-game")}
    />
  );
};
export default AddGameIcon;
