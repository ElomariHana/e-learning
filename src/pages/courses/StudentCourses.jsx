import React, {useState, useEffect} from 'react'
import axios from "axios";
import { CourseStudent } from "../../components";
import { Container, Row, Col } from "reactstrap";
import { NoDataFound } from '../../components';
import './AllCourses.scss'
 

const StudentCourses = () => {
  const [data, setData] = useState([]);
  const fetchPurchaseCourse = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/courses`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching Data:', error);
    }
 
   };
   useEffect(() => {
     fetchPurchaseCourse();
   },[]);
    
  return (
    <div className='elearning_courses'>
        <div className='elearning_courses-header'>
        <div className='elearning_profile-header__title'>
        <h4>My Courses</h4>
        <p>Here are the courses you've enrolled in. Dive in and continue your learning journey.</p>
        </div>
      </div>
      <div className='elearning_courses_content'>
        {
          data.length === 0 ? 
          (
            <NoDataFound/>
          )
          :
          (
          <Container>
            <Row>
              {data.map((item) => (
              <Col lg="4" md="6" sm="6">
                <CourseStudent key={item.id} item={item} />
                </Col>
                ))}
                </Row>
                </Container>
          )
        }
      </div>      
    </div>
  )
}

export default StudentCourses
