import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@chakra-ui/react";
import { isAuthed } from "../utils/utils";
import queryClient from "../queryClient/queryClient";
import { PLAYERS } from "../constants/queryKeys";
import { getPlayers } from "../api/api";
import Navbar from "./Navbar";
import AddGameIcon from "./basic/AddGameIcon";
import Footer from "./basic/Footer";

const AppContainer = () => {
  const authed = isAuthed();
  const prefetchPlayers = async () => {
    await queryClient.prefetchQuery(PLAYERS, getPlayers, {
      staleTime: Infinity,
    });
  };
  useEffect(() => prefetchPlayers, []);

  return (
    <Container
      textAlign="center"
      fontSize="xl"
      pt="3rem"
      pb="5rem"
      maxW="1350px"
      minHeight="100vh"
      pos="relative"
    >
      <Navbar />
      {authed && <AddGameIcon />}
      <Outlet />
      <Footer />
    </Container>
  );
};

export default AppContainer;
