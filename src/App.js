import React, { useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { ChakraProvider, theme, Container } from "@chakra-ui/react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import queryClient from "./queryClient/queryClient";
import { PLAYERS } from "./constants/queryKeys";
import { getPlayers } from "./api/api";
import ProtectedRoute from "./components/basic/ProtectedRoute";
import Home from "./components/views/Home";
import PlayerView from "./components/views/PlayerView";
import SingleGame from "./components/views/SingleGame";
import AddGame from "./components/views/AddGame";
import AddGameIcon from "./components/basic/AddGameIcon";
import Navbar from "./components/Navbar";
import GameList from "./components/views/GameList";
import { isAuthed } from "./utils/utils";

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

function App() {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<AppContainer />}>
            <Route index element={<Home />} />
            <Route path="players/:id" element={<PlayerView />} />
            <Route path="games" element={<GameList />} />
            <Route path="games/:gameId" element={<SingleGame />} />
            <Route
              path="add-game"
              element={
                <ProtectedRoute>
                  <AddGame />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
