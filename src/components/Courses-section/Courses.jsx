import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import CourseCard from "./CourseCard";
import "./courses.css";


const Courses = () => {
  const [coursesData, setCoursesData] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/courses?perPage=100`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setCoursesData(response.data.data); 
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);
  return (
    <section id="courses" className="section__padding">
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="course__top d-flex justify-content-between align-items-center">
              <div className="course__top__left">
                <h2>Our Courses</h2>
                <p>
                Explore our top courses designed to enhance your skills and knowledge in networking, security, and cloud computing. 
                Each course is crafted by industry experts to provide you with practical, hands-on learning experiences.
                </p>
              </div>
              <div className="w-100 text-end">
                <button className="button">See All</button>
              </div>
            </div>
          </Col>
          {coursesData.map((item) => (
            <Col lg="4" md="6" sm="6">
              <CourseCard key={item.id} item={item} type="landingPage"/>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Courses;
