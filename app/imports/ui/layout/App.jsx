import React from "react";
import Home from "../pages/Home";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ChatBot from "../pages/chatbot/ChatBot";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HelpDesk from "../pages/HelpDesk";
import Admin from "../pages/Admin";
import ReportsPage from "../pages/report/ReportsPage";
import ManageFAQPage from "../pages/faq/ManageFAQPage";

const PageNotFound = () => (
  <div className={"d-flex justify-content-center"}>
    <h1 className={"p-5"}>Error 404: Page Not Found</h1>
  </div>
);

export const App = () => (
  <Router>
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/help" element={<HelpDesk />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/admin/report" element={<ReportsPage />} />
        <Route exact path="/admin/faq" element={<ManageFAQPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ChatBot />
      <Footer />
    </div>
  </Router>
);
