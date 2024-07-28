import React from 'react'
import { CourseCard } from "../../components";
import { Container, Row, Col } from "reactstrap";
import courseImg1 from "../../assests/images/networking.jpg";
import courseImg2 from "../../assests/images/visuel-cyber.jpg";
import courseImg3 from "../../assests/images/cloud.jpg";

import './AllCourses.scss'

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
    {
      id: "03",
      title: "Cloud Computing Essentials",
      lesson: 12,
      price: 120,
      rating: 5.9,
      imgUrl: courseImg3,
    },
    {
        id: "03",
        title: "Cloud Computing Essentials",
        lesson: 12,
        price: 120,
        rating: 5.9,
        imgUrl: courseImg3,
      }
  ];

const AllCourses = () => {
    
  return (
    <div className='elearning_courses'>
        <div className='elearning_courses-header'>
        <div className='elearning_profile-header__title'>
        <h4>All Courses</h4>
        <p>Explore our top courses designed to enhance your skills and knowledge.</p>
        </div>
        <div>
          <button className='elearning_courses-header_button' type='button'>Add new course</button>
        </div>
      </div>
      <div className='elearning_courses_content'>
      <Container>
        <Row>
          {coursesData.map((item) => (
            <Col lg="4" md="6" sm="6">
              <CourseCard key={item.id} item={item} />
            </Col>
          ))}
        </Row>
      </Container>
      </div>      
    </div>
  )
}

export default AllCourses
