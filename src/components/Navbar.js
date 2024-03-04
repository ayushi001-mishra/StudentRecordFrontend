import React, { useState } from 'react';
import logo from './logo.webp'; 

const Navbar = () => {
  return (
    <div>
    <nav className="navbar">
      <div className="navbar-container">
      <ul>
        <li><img src={logo} alt="Logo" className="navbar-logo" /></li>
        <li><a href="http://localhost:3000/">Student</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#about">About</a></li>
      </ul>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
