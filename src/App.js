import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<p>naman chautiya</p>}></Route>

        <Route
          exact
          path="/started"
          element={<p>this is new address</p>}
        ></Route>

        <Route> this is error</Route>
      </Routes>

      {/* <Routes>
      </Routes> */}
    </BrowserRouter>
  );
}

export default App;
