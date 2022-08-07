import React from "react";
import { Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import queryClient from "./queryClient/queryClient";
import theme from "./config/theme";
import ProtectedRoute from "./components/basic/ProtectedRoute";
import Leaderboard from "./components/views/Leaderboard";
import PlayerView from "./components/views/PlayerView";
import SingleGame from "./components/views/SingleGame";
import AddGame from "./components/views/AddGame";
import GameList from "./components/views/GameList";
import AppContainer from "./components/AppContainer";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<AppContainer />}>
            <Route index element={<Leaderboard />} />
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
