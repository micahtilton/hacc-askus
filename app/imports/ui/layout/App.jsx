import React from 'react';
import { Hello } from '../components/Hello.jsx';
import { Info } from '../components/Info.jsx';
import Home from '../pages/Home';
import NavBar from '../components/NavBar';
export const App = () => (
  <div>
    <NavBar />
    <Home />
  </div>
);
