import React from 'react'
import './Lessons.scss'
const Lessons = () => {
  return (
    <div className='elearning__lessons'>
         <div className='elearning__lessons-header'>
        <div className='elearning__lessons-header__title'>
        <h4>Lessons</h4>
        <p>Manage Your Lessons.</p>
        </div>
        <div>
          <button className='elearning__lessons-header_button' type='button'>Add new Lessons</button>
        </div>
      </div>      
    </div>
  )
}

export default Lessons
