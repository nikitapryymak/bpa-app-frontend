import { useQuery } from "react-query";
import { getRecentOpponents } from "../api/api";
import { RECENT_OPPONENTS } from "../constants/queryKeys";

const useRecentOpponents = (opts = {}) =>
  useQuery(RECENT_OPPONENTS, getRecentOpponents, opts);

export default useRecentOpponents;
