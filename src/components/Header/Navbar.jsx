import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { SiSololearn } from "react-icons/si";

import { useNavigate } from 'react-router-dom'; 

import './navbar.css';

const Navbar = () => {

  const navigate = useNavigate();

  //useState
  const [toggleMenu, setToggleMenu] = useState(false);

  //functions
  const handleSignIn = () => {
    navigate('/login')
  }
  const handleSignUp = () => {
    navigate('/register')
  }

  return (
    <div className="elearning__navbar">
      <div className="elearning__navbar-links">
        <div className="elearning__navbar-links_logo">
        <h2 className="d-flex align-items-center gap-1">
          <SiSololearn style={{ color: '#17bf9e', fontSize: '30px', marginRight: '5px' }} />
          NetSecCloud
        </h2>
        </div>
      
      </div>
      <div className="elearning__navbar-sign">
      <div className="elearning__navbar-links_container">
          <p><a className="custom-link" href="#home">Home</a></p>
          <p><a className="custom-link" href="#courses">Courses</a></p>
          <p><a className="custom-link" href="#aboutus">About Us</a></p>
          <p><a className="custom-link" href="#announcements">Announcements</a></p>
          <p><a className="custom-link" href="#footer">Contact</a></p>
        </div>
        <p className="sign-in" onClick={handleSignIn}>Sign in</p>
        <button type="button" onClick={handleSignUp}>Sign up</button>
      </div>
      <div className="elearning__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="var(--color-basic)" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="var(--color-basic)" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className="elearning__navbar-menu_container scale-up-center">
          <div className="elearning__navbar-menu_container-links">
            <p><a href="#home">Home</a></p>
            <p><a href="#courses">Courses</a></p>
            <p><a href="#aboutus">About Us</a></p>
            <p><a href="#announcements">Announcements</a></p>
            <p><a href="#contact">Contact</a></p>
          </div>
          <div className="elearning__navbar-menu_container-links-sign">
            <p onClick={handleSignIn}>Sign in</p>
            <button type="button" onClick={handleSignUp}>Sign up</button>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;