import { useQuery } from "react-query";
import { getGames } from "../api/api";
import { GAMES } from "../constants/queryKeys";

const useGames = (opts = {}) => useQuery(GAMES, getGames, opts);

export default useGames;
