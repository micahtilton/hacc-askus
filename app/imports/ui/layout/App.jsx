import React from 'react';
import { Hello } from '../components/Hello.jsx';
import { Info } from '../components/Info.jsx';
import Home from '../pages/Home';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export const App = () => (
  <div className="d-flex flex-column min-vh-100">
    <NavBar />
    <Home />
    <Footer />
  </div>
);
