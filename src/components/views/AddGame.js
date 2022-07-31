import { useState, useRef } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import useAddGame from "../../hooks/useAddGame";

const AddGame = () => {
  const fileInputRef = useRef();
  const dateRef = useRef({});
  const [gameInfo, setGameInfo] = useState({ title: "", opponent: "" });
  const [fileContents, setFileContents] = useState("");
  const [fileError, setFileError] = useState("");
  const { opponent, title } = gameInfo;

  const {
    mutate: addGame,
    isLoading,
    error,
  } = useAddGame({
    onSettled: async () => {
      setFileContents("");
      setGameInfo({ title: "", opponent: "" });
      fileInputRef.current.value = null;
      dateRef.current.value = null;
    },
  });

  const onChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file?.type !== "text/csv") return setFileError("File must be a CSV");

    const reader = new FileReader();
    reader.onload = (e) => {
      setFileContents(e.target.result);
      setFileError("");
    };
    reader.onerror = () => setFileError("Failed to parse CSV file");
    reader.readAsText(file);
  };

  return (
    <Flex
      m="2rem auto"
      w="fit-content"
      maxW="500px"
      direction="column"
      justify="center"
      align="center"
    >
      <Text>Add CSV below:</Text>
      <Input
        ref={fileInputRef}
        variant="unstyled"
        placeholder="Add a CSV file"
        type="file"
        mt="1rem"
        w="fit-content"
        onChange={onChange}
      />
      {fileError && (
        <Text color="red.300" mt=".75rem">
          {fileError}
        </Text>
      )}
      <Input
        ref={dateRef}
        placeholder="Select Date"
        size="lg"
        mt="1.5rem"
        type="date"
      />
      <FormControl isRequired mt="1.5rem">
        <FormLabel>Opponent</FormLabel>
        <Input
          placeholder="Opponent"
          size="lg"
          type="text"
          value={opponent}
          onChange={(e) =>
            setGameInfo((prev) => ({ ...prev, opponent: e.target.value }))
          }
        />
      </FormControl>
      <FormControl isRequired mt="1.5rem">
        <FormLabel>Game Title</FormLabel>
        <Input
          placeholder="Title"
          size="lg"
          type="text"
          value={title}
          onChange={(e) =>
            setGameInfo((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </FormControl>

      <Button
        disabled={!fileContents || fileError || !opponent || !title}
        isLoading={isLoading}
        variant="solid"
        color="green.300"
        size="lg"
        mt="1.25rem"
        onClick={() =>
          addGame({
            fileContents,
            date: dateRef.current.value,
            opponent,
            title,
          })
        }
      >
        Send
      </Button>

      {error?.type === "ValidationError" && error?.details && (
        <List spacing={3}>
          {error.details.map(({ message }, i) => (
            <ListItem color="red.300" mt=".75rem" key={i}>
              <ListIcon as={WarningIcon} color="red.300" />
              {message}
            </ListItem>
          ))}
        </List>
      )}
    </Flex>
  );
};
export default AddGame;
