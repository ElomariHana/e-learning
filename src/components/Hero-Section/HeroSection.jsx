import React from "react";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../../assests/images/hero-img1.png";
import "./hero-section.css";
import { FaNetworkWired } from "react-icons/fa6";
import { IoIosCloud } from "react-icons/io";
import { FaBuildingLock } from "react-icons/fa6";
import { LiaNetworkWiredSolid } from "react-icons/lia";
import { PiNetworkLight } from "react-icons/pi";

const HeroSection = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="hero__content">
              <h2 className="mb-4 hero__title">
              Empowering Your Future <br /> in Networking, Security, <br /> and Cloud Computing
              </h2>
              <p className="mb-5">
              Are you ready to master the critical skills needed in today's tech-driven world ?<br /> 
              At NetSecCloud, we offer a comprehensive e-learning experience<br /> 
              designed for aspiring and seasoned professionals alike.
              </p>
            </div>
            <div className="search">
              <button className='btn'>
                GET STARTED  
              </button>
              <button className="btn1">
                VIEW COURSE    
              </button>
            </div>
          </Col>

          <Col lg="6" md="6">
          <PiNetworkLight style={{ color: '#17bf9e', fontSize: '400px', marginLeft: '200px' }}/>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
