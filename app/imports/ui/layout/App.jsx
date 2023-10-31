import React from 'react';
import Home from '../pages/Home';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ChatBot from '../ChatBot';

export const App = () => (
  <div className="d-flex flex-column min-vh-100">
    <NavBar />
    <Home />
    {/*<ChatBot/> */}
    <Footer />
  </div>
);
