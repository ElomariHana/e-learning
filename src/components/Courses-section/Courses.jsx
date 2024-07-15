import React from "react";
import { Container, Row, Col } from "reactstrap";
import courseImg1 from "../../assests/images/networking.jpg";
import courseImg2 from "../../assests/images/visuel-cyber.jpg";
import courseImg3 from "../../assests/images/cloud.jpg";
import "./courses.css";
import CourseCard from "./CourseCard";

const coursesData = [
  {
    id: "01",
    title: "Mastering Network Fundamentals",
    lesson: 12,
    price: 100,
    rating: 5.9,
    imgUrl: courseImg1,
  },

  {
    id: "02",
    title: "Network Security Essentials",
    lesson: 12,
    price: 150,
    rating: 5.9,
    imgUrl: courseImg2,
  },

  {
    id: "03",
    title: "Cloud Computing Essentials",
    lesson: 12,
    price: 120,
    rating: 5.9,
    imgUrl: courseImg3,
  },
];

const Courses = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="course__top d-flex justify-content-between align-items-center">
              <div className="course__top__left w-50">
                <h2>Our Courses</h2>
                <p>
                Explore our top courses designed to enhance your skills and knowledge in networking, security, and cloud computing. 
                Each course is crafted by industry experts to provide you with practical, hands-on learning experiences.
                </p>
              </div>

              <div className="w-50 text-end">
                <button className="button">See All</button>
              </div>
            </div>
          </Col>
          {coursesData.map((item) => (
            <Col lg="4" md="6" sm="6">
              <CourseCard key={item.id} item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Courses;
