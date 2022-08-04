import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import { deleteGame } from "../api/api";
import { GAMES } from "../constants/queryKeys";

const useDeleteGame = (opts = {}) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(async (gameId) => deleteGame(gameId), {
    onSuccess: async (res) => {
      const deletedGameId = parseInt(res.gameId, 10);
      toast({
        title: "Successfully Deleted Game",
        status: "success",
        duration: 2500,
        position: "bottom-left",
      });
      queryClient.setQueryData(GAMES, (prev) =>
        prev.filter((game) => game.gameId !== deletedGameId)
      );
    },
    onError: async () => {
      toast({
        title: `Failed to Delete Game`,
        status: "error",
        duration: 2500,
        position: "bottom-left",
      });
    },
    ...opts,
  });
};

export default useDeleteGame;
