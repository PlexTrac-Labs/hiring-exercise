import { styled } from "@mui/system";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import pages from "./pages";

const AppDiv = styled("div")({
  minHeight: "100vh",
});

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
