import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Home from "./pages/Home";
import Show from "./pages/Show";
import Started from "./pages/Started";

const theme = {
  mainColors: {
    blue: "#2400ff",
    gray: "#c 6c6c6",
    dark: "#353535",
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>

        <Route exact path="/Started" element={<Started />}></Route>

        <Route exact path="/show/:id" element={<Show />}></Route>

        <Route> this is error</Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
