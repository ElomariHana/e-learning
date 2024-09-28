import React from "react";
import { FiDollarSign } from "react-icons/fi";
import { MdPlayLesson } from "react-icons/md";
import { useNavigate } from 'react-router-dom'; 
import { useNavigation } from '../../context/NavigationContext'

const CourseCard = (props) => {
  const { type, item } = props;

  const navigate = useNavigate();
  const { setNavigationState } = useNavigation();
  const { title, lesson, price } = item;
  const imageSrc = `${process.env.REACT_APP_API_STORAGE_URL}${item.image || ''}`;

  const handlePurchare = () => {
    if( type === 'landingPage') {
      setNavigationState({ intendedAction: 'buyCourse', courseId: props.item.id });
      navigate('/register');
    } else if (type === 'student') {
      navigate(`/payment/${props.item.id}`);
    }
      
  }

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
          <p className="students d-flex align-items-center gap-1">
            <FiDollarSign style={{ color: '#17bf9e', fontSize: '15px' }} />
            {price}
          </p>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="rate">
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
          </div>
          <p className="enroll d-flex align-items-center gap-1">
            <button
              type="button"
              className="button__card"
              onClick={handlePurchare}
            >
              Buy it Now
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
