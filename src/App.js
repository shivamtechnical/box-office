import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Started from "./pages/Started";
function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>

        <Route exact path="/Started" element={<Started />}></Route>

        <Route> this is error</Route>
      </Routes>
    </div>
  );
}

export default App;
