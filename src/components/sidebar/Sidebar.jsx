import { useContext, useEffect, useRef } from "react";
//import { ThemeContext } from "../../context/ThemeContext";
import { SidebarContext } from "../../context/SidebarContext"; 
//import { LIGHT_THEME } from "../../constants/themeConstants";
import { SiSololearn } from "react-icons/si";
import { MdCastForEducation } from "react-icons/md";
import { RiFolderReduceLine } from "react-icons/ri";
//import { PiStudent } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
//import { MdOutlinePlayLesson } from "react-icons/md";

//import LogoBlue from "../../assests/images/logo_blue.svg";
//import LogoWhite from "../../assests/images/logo_white.svg";

import {
  //MdOutlineAttachMoney,
  //MdOutlineBarChart,
  MdOutlineClose,
  MdOutlineCurrencyExchange,
  MdOutlineGridView,
  MdOutlineLogout,
 // MdOutlineMessage,
 // MdOutlinePeople,
  //MdOutlineSettings,
  //MdOutlineShoppingBag,
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; 

import "./sidebar.scss";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  //const { theme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);
  const userRole = localStorage.getItem('user_role');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role');
    navigate('/login');
  };
  const isActive = (path) => location.pathname === path;


  // closing the navbar when clicked outside the sidebar area
  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-oepn-btn"
    ) {
     // closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

  return (
    <nav
      className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
      ref={navbarRef}
    >
      <div className="sidebar-top">
        <div className="sidebar-brand">
        <SiSololearn style={{ color: '#17bf9e', fontSize: '20px', marginLeft: '30px', marginBottom: '6px' }}/>

          <span className="sidebar-brand-text">NetSecCloud</span>
        </div>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <MdOutlineClose size={24} />
        </button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
          {userRole === 'admin' && (
            <li className="menu-item">
              <Link to="/admin/insights" className={`menu-link ${isActive('/admin/insights') ? 'active' : ''}`}>
                <span className="menu-link-icon">
                  <MdOutlineGridView size={18} />
                </span>
                <span className="menu-link-text">Dashboard</span>
              </Link>
            </li>
          )}
           {userRole === 'admin' && (
          <li className="menu-item">
            <Link to="/admin/manage_courses" className={`menu-link ${isActive('/admin/manage_courses') ? 'active' : ''}`}>
              <span className="menu-link-icon">
                <MdCastForEducation size={20} />
              </span>
              <span className="menu-link-text">Manage Courses</span>
            </Link>
          </li>
           )}
            {userRole === 'student' && (
            <li className="menu-item">
              <Link to="/e-learning/mycourses" className={`menu-link ${isActive('/e-learning/mycourses') ? 'active' : ''}`}>
                <span className="menu-link-icon">
                  <MdCastForEducation size={20} />
                </span>
                <span className="menu-link-text">My Courses</span>
              </Link>
            </li>
            )}
            {userRole === 'student' && (
            <li className="menu-item">
              <Link to="/e-learning/courses" className={`menu-link ${isActive('/e-learning/courses') ? 'active' : ''}`}>
                <span className="menu-link-icon">
                  <RiFolderReduceLine size={18} />
                </span>
                <span className="menu-link-text">Buy Courses</span>
              </Link>
            </li>
            )}
            {userRole === 'admin' && (
            <li className="menu-item">
              <Link to="/admin/transactions" className={`menu-link ${isActive('/admin/transactions') ? 'active' : ''}`}>
                <span className="menu-link-icon">
                  <MdOutlineCurrencyExchange size={18} />
                </span>
                <span className="menu-link-text">Transactions</span>
              </Link>
            </li>
             )}
             {userRole === 'student' && (
            <li className="menu-item">
              <Link to="/e-learning/profile" className={`menu-link ${isActive('/e-learning/profile') ? 'active' : ''}`}>
                <span className="menu-link-icon">
                  <CgProfile size={20} />
                </span>
                <span className="menu-link-text">Profile</span>
              </Link>
            </li>
           )}
          </ul>
        </div>

        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            <li className="menu-item">
              <Link className="menu-link" onClick={handleLogout}>
                <span className="menu-link-icon">
                  <MdOutlineLogout size={20} />
                </span>
                <span className="menu-link-text">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
