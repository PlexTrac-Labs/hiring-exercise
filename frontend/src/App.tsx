import { styled, ThemeProvider } from "@mui/system";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { TopBar } from "./components/TopBar";
import { TOP_BAR_HEIGHT } from "./helpful/constants";
import { theme } from "./helpful/style";
import pages from "./pages";

const AppDiv = styled("div")({
  marginTop: TOP_BAR_HEIGHT,
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <TopBar />
        <AppDiv>
          <div>
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
          </div>
        </AppDiv>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
