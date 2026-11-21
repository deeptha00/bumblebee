import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CompanyProvider } from "./context/CompanyContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Industries from "./pages/Industries";
import Leadership from "./pages/Leadership";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Workshop from "./pages/Workshop";
import AdminLogin from "./admin/AdminLogin";
import AdminPanel from "./admin/AdminPanel";
import AdminRoute from "./admin/AdminRoute";

function App() {
  return (
    <HelmetProvider>
      <CompanyProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:slug" element={<CourseDetail />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/workshop" element={<Workshop />} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/*"
              element={
                <AdminRoute>
                  <AdminPanel />
                </AdminRoute>
              }
            />

            {/* Catch-all route to prevent white screen on unknown paths */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Router>
      </CompanyProvider>
    </HelmetProvider>
  );
}

export default App;
