import React from 'react'
import { CourseStudent } from "../../components";
import { Container, Row, Col } from "reactstrap";
import courseImg1 from "../../assests/images/networking.jpg";
import courseImg2 from "../../assests/images/visuel-cyber.jpg";

import './AllCourses.scss'

const coursesData = [
    {
      id: "01",
      title: "Mastering Network Fundamentals",
      lesson: 12,
      imgUrl: courseImg1,
    },
  
    {
      id: "02",
      title: "Network Security Essentials",
      lesson: 12,
      imgUrl: courseImg2,
    },
  ];

const StudentCourses = () => {
    
  return (
    <div className='elearning_courses'>
        <div className='elearning_courses-header'>
        <div className='elearning_profile-header__title'>
        <h4>My Courses</h4>
        <p>Here are the courses you've enrolled in. Dive in and continue your learning journey.</p>
        </div>
      </div>
      <div className='elearning_courses_content'>
      <Container>
        <Row>
          {coursesData.map((item) => (
            <Col lg="4" md="6" sm="6">
              <CourseStudent key={item.id} item={item} />
            </Col>
          ))}
        </Row>
      </Container>
      </div>      
    </div>
  )
}

export default StudentCourses
