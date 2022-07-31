import { useQuery } from "react-query";
import { getGames } from "../api/api";
import { RECENT_OPPONENTS } from "../constants/queryKeys";

const useRecentOpponents = (opts = {}) =>
  useQuery(RECENT_OPPONENTS, getGames, opts);

export default useRecentOpponents;
