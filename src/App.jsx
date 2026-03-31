import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Workshop from "./pages/Workshop";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workshop" element={<Workshop />} />
        {/* Catch-all route to prevent white screen on hash changes */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
