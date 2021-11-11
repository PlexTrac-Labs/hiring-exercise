import { Box } from "@mui/material";
import { styled, ThemeProvider } from "@mui/system";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { TopBar } from "./components/TopBar";
import { TOP_BAR_HEIGHT } from "./helpful/constants";
import { theme } from "./helpful/style";
import pages from "./pages";

const AppBox = styled(Box)(({ theme }) => ({
  marginTop: TOP_BAR_HEIGHT,
  display: "flex",
  flexDirection: "column",
  padding: 15,
  justifyContent: "center",
  alignItems: "center",
}));

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <TopBar />
        <AppBox>
          <Routes>
            {pages.map((page) => {
              return (
                <Route
                  key={page.route}
                  path={page.route}
                  element={<page.comp />}
                />
              );
            })}
          </Routes>
        </AppBox>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
