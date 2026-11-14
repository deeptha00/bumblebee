import React from "react";
import Topbar from "./Topbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="antialiased">
      <div className="grain-overlay" aria-hidden="true" />
      <Topbar />
      <main className="overflow-x-hidden">{children}</main>
      <Footer />
    </div>
  );
}
