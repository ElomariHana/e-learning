import React from "react";
import "./about.css";
import { Container, Row, Col } from "reactstrap";
import aboutImg from "../../assests/images/about-us.webp";
import CountUp from "react-countup";
import { GrProjects } from "react-icons/gr";
import { FaSwatchbook } from "react-icons/fa6";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdTopic } from "react-icons/md";

import "./about.css";

const AboutUs = () => {
  return (
    <section id="aboutus" className="section__padding">
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="about__img">
              <img src={aboutImg} alt="" className="w-100" />
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about__content">
              <h2>About Us</h2>
              <p>
              Welcome to NetSecCloud Learn, where we empower your journey in networking, security, 
              and cloud computing. Our mission is to provide you with high-quality, practical education 
              that helps you master the essential skills in these critical fields.
              </p>

              <div className="about__counter">
                <div className=" d-flex gap-5 align-items-center">
                  <div className="single__counter">
                    <span className="counter">
                    <FaSwatchbook style={{ color: '#17bf9e', fontSize: '27px', marginRight: '10px' }}/>
                    </span>

                    <p className="counter__title">Courses Completed (10K)</p>
                  </div>

                  <div className="single__counter">
                    <span className="counter">
                    <FaPeopleGroup style={{ color: '#17bf9e', fontSize: '27px', marginRight: '10px' }}/>
                    </span>
                    <p className="counter__title">Learners Worldwide (12K)</p>
                  </div>
                </div>

                <div className=" d-flex gap-5 align-items-center">
                  <div className="single__counter">
                    <span className="counter">
                    <GrProjects style={{ color: '#17bf9e', fontSize: '27px', marginRight: '10px' }}/>
                    </span>
                    <p className="counter__title">Projects Completed (90K)</p>
                  </div>

                  <div className="single__counter">
                    <span className="counter">
                    <MdTopic style={{ color: '#17bf9e', fontSize: '27px', marginRight: '10px' }}/>
                    </span>

                    <p className="counter__title">Topics Covered</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
