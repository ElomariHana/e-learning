import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import { FaSwatchbook } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutForm } from '../../pages'
import './payment.css'

const Payment = () => {

  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const { courseId } = useParams();

  const fetchCourse = useCallback(async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/courses/${courseId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setCourse(response.data);
    } catch (error) {
      console.error('Error fetching Data:', error);
    } 
  }, [courseId]);

  const fetchPaymentIntent = useCallback(async () => {
    setLoading(true);
    if (!course || !course.price) return; // Ensure course and price are available

    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/payment/create-payment-intent`, {
        amount: course.price * 100, // Amount in cents
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setClientSecret(response.data.clientSecret);
    } catch (error) {
      console.error('Error creating payment intent:', error);
    } finally {
      setLoading(false);
    }
  }, [course]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

    useEffect(() => {
      if (course.price) {
        fetchPaymentIntent();
      }
    }, [fetchPaymentIntent, course.price]);
    useEffect(() => {
      // Initialize Stripe when the component mounts
      setStripePromise(loadStripe('pk_test_51PuKBkDZoBvvo4QND6sJaBB0oumKqoEt5rG246OgiGIyZeMso7bcVbi14SNM8GJXX5XTHPaupvhBXNsfTHvYE0FJ00UWZmHO9M'));
    }, []);


  return (
    <div className='elearning__payment__header'>
        <div className='header'>
            <p>Course/Checkout</p>
        </div>
        <div className='elearning__payment'>
        <div className='elearning__course_info'>
            <div className='elearning__course_card'>
            <div className="course_img">
              <img src={`${process.env.REACT_APP_API_STORAGE_URL}${course.image || ''}`} alt="course" className="w-100" />
            </div>
            <h4>{course.title}</h4>
            <p>{course.description}
            </p>
            <div className='elearning__course_card-info'>
                <div className="single__counter">
                    <span className="counter">
                        <FaSwatchbook style={{ color: '#17bf9e', fontSize: '27px', marginRight: '10px' }}/>
                    </span>
                    <p className="counter__title"> {course.lessons} Lessons</p>
                  </div>
                  <div className="single__counter">
                    <span className="counter">
                        <FaDollarSign style={{ color: '#17bf9e', fontSize: '27px', marginRight: '10px' }}/>
                    </span>
                    <p className="counter__title"> ${course.price}</p>
                  </div>
                  <div className="rate">
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    </div>
            </div>
            </div>
        </div>
        <div className='elearning__payment_method'>
            <h1>Pay Online</h1>
            {loading && <div className='loading_msg'> <AiOutlineLoading3Quarters /> Loading...</div>} 
           {
            stripePromise && clientSecret && (
              <Elements stripe={stripePromise} options={{clientSecret}}>
                <CheckoutForm price={course.price} courseId={course.id} clientSecret={clientSecret}/>
              </Elements>
            )
           }
        </div>
        </div>
        <ToastContainer />   
    </div>
    
  )
}

export default Payment
