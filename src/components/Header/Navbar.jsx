import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { SiSololearn } from "react-icons/si";
import { CiShoppingCart } from "react-icons/ci";
import './navbar.css';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="elearning__navbar">
      <div className="elearning__navbar-links">
        <div className="elearning__navbar-links_logo">
        <h2 className="d-flex align-items-center gap-1">
          <SiSololearn style={{ color: '#17bf9e', fontSize: '30px', marginRight: '5px', marginLeft: '30px' }} />
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
          <p><a className="custom-link" href="#contact">Contact</a></p>
        </div>
        <CiShoppingCart style={{ color: '#17bf9e', fontSize: '27px', marginRight: '10px' }} />
        <p className="sign-in">Sign in</p>
        <button type="button">Sign up</button>
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
            <p>Sign in</p>
            <button type="button">Sign up</button>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;