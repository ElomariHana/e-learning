import React from "react";
import { Container, Row, Col } from "reactstrap";
import { MdSecurity } from "react-icons/md";
import { IoMdCloudOutline } from "react-icons/io";
import { FaNetworkWired } from "react-icons/fa6";
import { MdLockOutline } from "react-icons/md";
import './company-section.css'
const Company = () => {
  return (
    <section className="company__section">
      <Container>
        <Row>
          <Col lg="4" md="3" sm="4" xs="6">
            <h3 className="company__section-h3 d-flex align-items-center gap-1">
            <IoMdCloudOutline style={{ color: '#fff', fontSize: '30px', marginRight: '5px' }}/>Cloud Computing 
            </h3>
          </Col>

          <Col lg="3" md="3" sm="4" xs="6">
            <h3 className="company__section-h3 d-flex align-items-center gap-1">
            <MdSecurity style={{ color: '#fff', fontSize: '30px', marginRight: '5px' }}/> Security
            </h3>
          </Col>

          <Col lg="3" md="3" sm="4" xs="6">
            <h3 className="company__section-h3 d-flex align-items-center gap-1">
            <FaNetworkWired style={{ color: '#fff', fontSize: '30px', marginRight: '5px' }}/> Network
            </h3>
          </Col>

          <Col lg="2" md="3" sm="4" xs="6">
            <h3 className="company__section-h3 d-flex align-items-center gap-1">
              {" "}
              <MdLockOutline style={{ color: '#fff', fontSize: '30px', marginRight: '5px' }}/> Cybersec
            </h3>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Company;
