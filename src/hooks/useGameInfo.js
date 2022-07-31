import { useQuery } from "react-query";
import { getGameInfo } from "../api/api";
import { GAME_INFO } from "../constants/queryKeys";

const useGameInfo = (gameId, opts = {}) =>
  useQuery(GAME_INFO, () => getGameInfo(gameId));

export default useGameInfo;
