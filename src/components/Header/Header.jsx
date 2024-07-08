import React, { useRef } from "react";
import { Container } from "reactstrap";
import { CiShoppingCart } from "react-icons/ci";
import { SiSololearn } from "react-icons/si";

import "./header.css";

const navLinks = [
  {
    display: "Home",
    url: "#",
  },
  {
    display: "Courses",
    url: "#",
  },
  {
    display: "About Us",
    url: "#",
  },

  {
    display: "Announcements",
    url: "#",
  },
  {
    display: "Contact",
    url: "#",
  },
];

const Header = () => {
  const menuRef = useRef();

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  return (
    <header className="header">
      <Container>
        <div className="navigation d-flex align-items-center justify-content-between">
          <div className="logo">
            <h2 className=" d-flex align-items-center gap-1">
            <SiSololearn style={{ color: '#17bf9e', fontSize: '30px', marginRight: '5px' }}/> NetSecCloud.
            </h2>
          </div>

          <div className="nav d-flex align-items-center gap-5">
            <div className="nav__menu" ref={menuRef} onClick={menuToggle}>
              <ul className="nav__list">
                {navLinks.map((item, index) => (
                  <li key={index} className="nav__item">
                    <a href={item.url}>{item.display}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__right">
              <p className="mb-0 d-flex align-items-center gap-2">
                <CiShoppingCart style={{ color: '#17bf9e', fontSize: '27px', marginRight: '10px' }}/>
                <button className='login'>
                  Login  
                </button> 
              </p>
            </div>
          </div>

          <div className="mobile__menu">
            <span>
              <i class="ri-menu-line" onClick={menuToggle}></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
