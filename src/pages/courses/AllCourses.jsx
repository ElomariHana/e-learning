import React, {useEffect, useState} from 'react'
import { CourseCard } from "../../components";
import { Container, Row, Col } from "reactstrap";
import { NoDataFound } from '../../components'
import axios from "axios";

import './AllCourses.scss'

const AllCourses = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/courses`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching Data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  },[]);
  return (
    <div className='elearning_courses'>
        <div className='elearning_courses-header'>
        <div className='elearning_profile-header__title'>
        <h4>All Courses</h4>
        <p>Explore our top courses designed to enhance your skills and knowledge.</p>
        </div>
      </div>
      <div className='elearning_courses_content'>
        {
          data.length === 0 ?
          (
            <NoDataFound/>
          ):
          (
            <Container>
            <Row>
              {data.map((item) => (
                <Col lg="4" md="6" sm="6">
                  <CourseCard key={item.id} item={item} type="student"/>
                </Col>
              ))}
            </Row>
          </Container>
          )}
      </div>      
    </div>
  )
}

export default AllCourses
