import React from "react";
import Home from "../pages/Home";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ChatBot from "../ChatBot";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const MainPage = () => (
  <>
    <NavBar />
    <Home />
    <ChatBot />
    <Footer />
  </>
);

export const App = () => (
  <BrowserRouter>
    <div className="d-flex flex-column min-vh-100">
      <Routes>
        <Route path={"/admin"} element={<div>Hello world</div>} />
        <Route exact path={"/"} element={<MainPage />} />
      </Routes>
    </div>
  </BrowserRouter>
);
