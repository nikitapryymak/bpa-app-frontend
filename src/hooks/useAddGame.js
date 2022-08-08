import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import csv from "csvtojson";
import { getPlayers, sendGameCSVData } from "../api/api";
import csvConfig from "../config/csvConfig";
import { PLAYERS, RECENT_OPPONENTS } from "../constants/queryKeys";
import { findPlayerIdByName, getBPA } from "../utils/utils";

const useAddGame = (opts = {}) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(
    async ({ fileContents, opponent, title, date }) => {
      const players = queryClient.getQueryData(PLAYERS) || (await getPlayers());
      if (!players) throw new Error("Players not fetched");

      const json = await csv(csvConfig).fromString(fileContents);
      const stats = json.map((row) => ({
        ...row,
        playerId: players.find(findPlayerIdByName(row))?.id,
        BPA: getBPA(row),
      }));

      return sendGameCSVData({
        opponent: opponent.trim(),
        title: title.trim(),
        date,
        stats,
      });
    },
    {
      onSuccess: async () => {
        toast({
          title: "Successfully Added Game",
          status: "success",
          duration: 2500,
          position: "bottom-left",
        });
        await queryClient.invalidateQueries([RECENT_OPPONENTS]);
      },
      onError: async () => {
        toast({
          title: `Failed to Upload Game`,
          status: "error",
          duration: 2500,
          position: "bottom-left",
        });
      },
      ...opts,
    }
  );
};

export default useAddGame;
