import React from 'react';
import people from '../../assests/images/people.png';
import rsc from '../../assests/images/rsc.png';
import { useNavigate } from 'react-router-dom'; 
import "./hero-section.css";

const HeroSection = () => {
  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate('/login')
  }
  return (
    <div className="elearning__header section__padding" id="home">
    <div className="elearning__header-content">
      <h1 className="gradient__text">Empowering Your Future in Networking, Security, and Cloud Computing</h1>
      <p>Are you ready to master the critical skills needed in today's tech-driven world ? At NetSecCloud, we offer a comprehensive e-learning experience designed for aspiring and seasoned professionals alike.</p>

      <div className="elearning__header-content__input">
        <button className="get_started" type="button" onClick={handleSignIn}>Get Started</button>
        <button className="btn1" type="button" onClick={() => document.getElementById('courses').scrollIntoView({ behavior: 'smooth' })}>View Course</button>
      </div>

      <div className="elearning__header-content__people">
        <img src={people} alt='people'/>
        <p>1,600 people requested access a visit in last 24 hours</p>
      </div>
    </div>

    <div className="elearning__header-image">
    <img src={rsc} alt='people'/>
    </div>
  </div>
  );
};
export default HeroSection;
