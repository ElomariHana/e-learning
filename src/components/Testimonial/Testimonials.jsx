import React from "react"
import { testimonal } from "../../data"
import "./testimonial.css";
import img from "../../assests/images/personne.webp";

const Testimonials = () => {
  return (
    <>
      <section className='testimonal padding'>
        <div className='testimonal__container'>
          <h2>Our Students Feedback</h2>
          <div className='content grid2'>
            {testimonal.map((val) => (
              <div className='items shadow'>
                <div className='box flex'>
                  <div className='img'>
                    <img src={img} alt='' />
                  </div>
                  <div className='name'>
                    <h2>{val.name}</h2>
                    <span>{val.post}</span>
                  </div>
                </div>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Testimonials
