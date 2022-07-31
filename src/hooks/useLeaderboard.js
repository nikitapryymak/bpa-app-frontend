import { useQuery } from "react-query";
import { getLeaderboard } from "../api/api";
import { LEADERBOARD } from "../constants/queryKeys";

const useLeaderboard = (opts = {}) =>
  useQuery(LEADERBOARD, getLeaderboard, opts);

export default useLeaderboard;
