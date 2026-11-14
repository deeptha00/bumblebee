import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Industries from "./pages/Industries";
import Leadership from "./pages/Leadership";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Workshop from "./pages/Workshop";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/workshop" element={<Workshop />} />
          {/* Catch-all route to prevent white screen on unknown paths */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
