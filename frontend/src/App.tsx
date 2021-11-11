import { Box } from "@mui/material";
import { styled, ThemeProvider } from "@mui/system";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { TopBar } from "./components/TopBar";
import { TOP_BAR_HEIGHT } from "./helpful/constants";
import { theme } from "./helpful/style";
import { Pages, PrivatePages } from "./pages";
import { PrivateRoute } from "./pages/PrivateRoute";

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
            {Pages.map((page) => (
              <Route
                key={page.route}
                path={page.route}
                element={<page.comp />}
              />
            ))}
            {PrivatePages.map((page) => (
              <Route key={page.route} element={<PrivateRoute />}>
                <Route path={page.route} element={<page.comp />} />
              </Route>
            ))}
          </Routes>
        </AppBox>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
