import React from "react";
import Home from "../pages/Home";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ChatBot from "../ChatBot";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HelpDesk from "../pages/HelpDesk";

export const App = () => (
  <Router>
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/help" element={<HelpDesk />} />
        <Route exact path="/admin" element={<Admin />} />
      </Routes>
      <ChatBot />
      <Footer />
    </div>
  </Router>
);
