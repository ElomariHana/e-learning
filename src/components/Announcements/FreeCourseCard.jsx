import React from "react";

const FreeCourseCard = (props) => {
  const { imgUrl, title } = props.item;

  return (
    <div className="single__free__course">
      <div className="free__course__img mb-5">
        <img src={imgUrl} alt="" className="w-100" />
        <button className="button free__btn">New</button>
      </div>
      <div className="free__course__details">
        <h6>{title}</h6>
      </div>
    </div>
  );
};

export default FreeCourseCard;
