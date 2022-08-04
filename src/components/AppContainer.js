import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@chakra-ui/react";
import { isAuthed } from "../utils/utils";
import queryClient from "../queryClient/queryClient";
import { PLAYERS } from "../constants/queryKeys";
import { getPlayers } from "../api/api";
import Navbar from "./Navbar";
import AddGameIcon from "./basic/AddGameIcon";

const AppContainer = () => {
  const authed = isAuthed();
  const prefetchPlayers = async () => {
    await queryClient.prefetchQuery(PLAYERS, getPlayers, {
      staleTime: Infinity,
    });
  };
  useEffect(() => prefetchPlayers, []);

  return (
    <Container textAlign="center" fontSize="xl" pt="3rem" maxW="1350px">
      <Navbar />
      {authed && <AddGameIcon />}
      <Outlet />
    </Container>
  );
};

export default AppContainer;
