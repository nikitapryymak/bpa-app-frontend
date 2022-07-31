import axiosClient from "../config/axiosClient";
import { getAdminKey } from "../utils/utils";

export const getPlayers = async () =>
  axiosClient
    .get("/players")
    .then(({ data }) => data)
    .catch(({ response: { status, data } }) =>
      Promise.reject({ status, ...data })
    );

export const getLeaderboard = async () =>
  axiosClient
    .get("/leaderboard")
    .then(({ data }) => data)
    .catch(({ response: { status, data } }) =>
      Promise.reject({ status, ...data })
    );

export const getPlayerInfo = async (playerId) =>
  axiosClient
    .get(`/players/${playerId}`)
    .then(({ data }) => data)
    .catch(({ response: { status, data } }) =>
      Promise.reject({ status, ...data })
    );

export const getGames = async () =>
  axiosClient
    .get(`/games`)
    .then(({ data }) => data)
    .catch(({ response: { status, data } }) =>
      Promise.reject({ status, ...data })
    );

export const getGameInfo = async (gameId) =>
  axiosClient
    .get(`/games/${gameId}`)
    .then(({ data }) => data)
    .catch(({ response: { status, data } }) =>
      Promise.reject({ status, ...data })
    );

export const getRecentOpponents = async () =>
  axiosClient
    .get(`/opponents`)
    .then(({ data }) => data)
    .catch(({ response: { status, data } }) =>
      Promise.reject({ status, ...data })
    );

export const sendGameCSVData = async (data) =>
  axiosClient
    .post("/games", data, {
      headers: {
        "admin-key": getAdminKey(),
      },
    })
    .then(({ data }) => data)
    .catch(({ response: { status, data } }) =>
      Promise.reject({ status, ...data })
    );
