import React from "react";
import { FiDollarSign } from "react-icons/fi";
import { MdPlayLesson } from "react-icons/md";

const CourseCard = (props) => {
  const { imgUrl, title, lesson, price, rating } = props.item;

  return (
    <div className="single__course__item">
      <div className="course__img">
        <img src={imgUrl} alt="" className="w-100" />
      </div>

      <div className="course__details">
        <h6 className="course__title mb-4">{title}</h6>

        <div className=" d-flex justify-content-between align-items-center">
          <p className="lesson d-flex align-items-center gap-1">
          <MdPlayLesson style={{ color: '#17bf9e', fontSize: '15px', marginRight: '5px' }}/> {lesson} Lessons
          </p>

          <p className="students d-flex align-items-center gap-1">
          <FiDollarSign style={{ color: '#17bf9e', fontSize: '15px' }}/>{price}
          </p>
        </div>
        <div className=" d-flex justify-content-between align-items-center">
          <div className='rate'>
                    <i class="ri-star-fill"></i>
                    <i class="ri-star-fill"></i>
                    <i class="ri-star-fill"></i>
                    <i class="ri-star-fill"></i>
                    <i class="ri-star-fill"></i>
                  </div>

          <p className="enroll d-flex align-items-center gap-1">
          <a href="#"> Enroll Now</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
