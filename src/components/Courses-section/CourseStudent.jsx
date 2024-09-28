import React from "react";
import { MdPlayLesson } from "react-icons/md";
import { useNavigate } from 'react-router-dom'; 


const CourseStudent = (props) => {

  const navigate = useNavigate();
  const handleButton = (courseId) => {
    navigate(`/e-learning/tutorial/${courseId}`)
  }
  const { id, image, title, lesson} = props.item.course;
  const imageSrc = `${process.env.REACT_APP_API_STORAGE_URL}${image || ''}`;


  return (
    <div className="single__course__item">
      <div className="course__img">
        <img src={imageSrc} alt={title} className="w-100" />
      </div>
      <div className="course__details">
        <h6 className="course__title mb-4">{title}</h6>
        <div className="d-flex justify-content-between align-items-center">
          <p className="lesson d-flex align-items-center gap-1">
            <MdPlayLesson
              style={{ color: '#17bf9e', fontSize: '15px', marginRight: '5px' }}
            />
            {lesson} Lessons
          </p>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <p className="enroll d-flex align-items-center gap-1">
            <button
              type="button"
              className="button__card"
              onClick={() => handleButton(id)}
            >
              Start Learning
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseStudent;
