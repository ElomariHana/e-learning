import React from "react";
import { Container, Row, Col } from "reactstrap";
import courseImg01 from "../../assests/images/Cyber-Security.jpg";
import courseImg02 from "../../assests/images/machine-learning.jpg";
import FreeCourseCard from "./FreeCourseCard";
import "./announcement.css";

const freeCourseData = [
  {
    id: "01",
    title: "Cybersecurity Course",
    imgUrl: courseImg01,
  },
  {
    id: "02",
    title: "Machine Learning Course",
    imgUrl: courseImg02,
  },
];

const Announcements = () => {
  return (
    <section id="announcements" className="section__padding">
      <Container>
        <Row>
          <Col lg="12" className="text-center mb-5">
            <h2 className="fw-bold">Announcements</h2>
            <p>Discover our Feature Courses</p>
          </Col>
          {freeCourseData.map((item) => (
            <Col lg="3" md="4" className="mb-4" key={item.id}>
              <FreeCourseCard item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Announcements;
