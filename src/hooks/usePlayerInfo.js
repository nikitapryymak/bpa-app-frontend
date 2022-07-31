import { useQuery } from "react-query";
import { getPlayerInfo } from "../api/api";
import { PLAYER_INFO } from "../constants/queryKeys";

const usePlayerInfo = (playerId, opts = {}) => {
  const { data, ...rest } = useQuery(
    [PLAYER_INFO, playerId],
    () => getPlayerInfo(playerId),
    opts
  );

  return { ...data, ...rest };
};

export default usePlayerInfo;
