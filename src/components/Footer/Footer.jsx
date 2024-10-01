import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { SiSololearn } from "react-icons/si";
import { FaRegMap } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

import "./footer.css";

const footerQuickLinks = [
  {
    display: "Home",
    url: "#",
  },
  {
    display: "Courses",
    url: "#",
  },
  {
    display: "About US",
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

const footerInfoLinks = [
  {
    display: "Privacy Policy",
    url: "#",
  },
  {
    display: "Membership",
    url: "#",
  },

  {
    display: "Purchases Guide",
    url: "#",
  },

  {
    display: "Terms of Service",
    url: "#",
  },
];

const Footer = () => {
  return (
    <footer className="footer section__padding" id="footer">
      <Container>
        <Row>
          <Col lg="3" md="6" className="mb-4">
            <h2 className=" d-flex align-items-center gap-1">
            <SiSololearn style={{ color: '#17bf9e', fontSize: '30px', marginRight: '5px' }}/> NetSecCloud
            </h2>
            <div className="follows">
              <p className="mb-0">Follow us on social media</p>
              <span>
                {" "}
                <a href="facebook.com">
                  <i class="ri-facebook-line"></i>
                </a>
              </span>
              <span>
                {" "}
                <a href="facebook.com">
                  <i class="ri-instagram-line"></i>
                </a>
              </span>
              <span>
                {" "}
                <a href="facebook.com">
                  <i class="ri-linkedin-line"></i>
                </a>
              </span>
              <span>
                {" "}
                <a href="facebook.com">
                  <i class="ri-twitter-line"></i>
                </a>
              </span>
            </div>
          </Col>
          <Col lg="3" md="6" className="mb-4">
            <h6 className="fw-bold">Explore</h6>
            <ListGroup className="link__list">
              {footerQuickLinks.map((item, index) => (
                <ListGroupItem key={index} className="border-0 ps-0 link__item">
                  {" "}
                  <a href={item.url}>{item.display}</a>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col lg="3" md="6" className="mb-4">
            <h6 className="fw-bold">Information</h6>
            <ListGroup className="link__list">
              {footerInfoLinks.map((item, index) => (
                <ListGroupItem key={index} className="border-0 ps-0 link__item">
                  {" "}
                  <a href={item.url}>{item.display}</a>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col lg="3" md="6">
            <h6 className="fw-bold">Get in Touch</h6>
            <p><FaRegMap style={{ color: '#17bf9e', fontSize: '15px', marginRight: '5px' }}/> Address: Paris, France</p>
            <p><FaPhoneAlt style={{ color: '#17bf9e', fontSize: '15px', marginRight: '5px' }}/> Phone: +33 0123456789 </p>
            <p><IoMail style={{ color: '#17bf9e', fontSize: '15px', marginRight: '5px' }}/> Email: example@gmail.com</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
