import React from 'react'

const test = () => {
  return (
    <div>
      
    </div>
  )
}
/*
export default test
//
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';
import { RiMastercardFill } from "react-icons/ri";
//import { ImPaypal } from "react-icons/im";
import { FaSwatchbook } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa";
import aboutImg from "../../assests/images/Cyber-Security.jpg";
//import { PayPalButton } from 'react-paypal-button-v2';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; 
//stripe
import axios from 'axios';
import { Elements, CardNumberElement, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import './payment.css'
// Make sure to replace this with your actual Stripe public key
const stripePromise = loadStripe('pk_test_51PuKBkDZoBvvo4QND6sJaBB0oumKqoEt5rG246OgiGIyZeMso7bcVbi14SNM8GJXX5XTHPaupvhBXNsfTHvYE0FJ00UWZmHO9M');

const Payment = () => {

  //stripe
  const stripe = useStripe();
  const elements = useElements();


  const navigate = useNavigate();
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: '50%',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
    const [method, setMethod] = useState(false);
    const [course, setCourse] = useState([]);
    const { courseId } = useParams();
    const [clientSecret, setClientSecret] = useState('');

    const fetchCourse = async() => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`http://localhost:8000/api/courses/${courseId}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });
            setCourse(response.data);
          } catch (error) {
            console.error('Error fetching Data:', error);
          }
    } ;

    const handlePayment = (type) => {
      if (type === 'mastercard') {
        fetchPaymentIntent();
      }
      setMethod(true);
    };
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (!stripe || !elements) {
        return;
      }
  
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Customer Name',
          },
        },
      });
  
      if (error) {
        console.error(error);
        toast.error('Payment failed!');
      } else if (paymentIntent.status === 'succeeded') {
        toast.success('Payment successful!');
        navigate('/success'); // Redirect to a success page
      }
    };

   /* const createOrder = (data, actions) => {
        console.log('corse price', course.price, 'courseis', courseId)
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: course.price // Course price here
            }
          }]
        });
      };
     /*const onApprove = (data, actions) => { 
        return actions.order.capture();
      }*/

    /* const onApprove = (data, actions) => {
        return actions.order.capture().then(async (details) => {
          //orderinfor_data.payment_id = details.id;
          try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                throw new Error('No access token found');
            }
            const response = await axios.post(`http://localhost:8000/api/payment/capture-payment`, {
              orderId: data.orderID,
              courseId: courseId,
            }, {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });
            navigate(`/dashboard/mycourses`)
            console.log('Payment successful!', response.data);
          } catch (error) {
            toast.error('Error capturing payment', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            console.error('Error capturing payment:', error);

          }
        });
      };*/

  /*const fetchPaymentIntent = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/payment/create-payment-intent', {
        amount: course.price * 100, // Amount in cents
      });
      setClientSecret(response.data.clientSecret);
    } catch (error) {
      console.error('Error creating payment intent:', error);
    }
  };

    useEffect(() => {
        fetchCourse();
    },[]);

    useEffect(() => {
      if (course.price) {
        fetchPaymentIntent();
      }
    }, [course.price]);


  return (
    <div className='elearning__payment__header'>
        <div className='header'>
            <p>Course/Checkout</p>
        </div>
        <div className='elearning__payment'>
        <div className='elearning__payment_methode'>
            <h1>Pay Online</h1>
            <div className="popup-container-payment" ref={modalRef}>
      <div className="popup-header">
       
        <img
          id="btn-auth-error-popup-close"
          src={cross}
          className="popup-close-icon"
          onClick={(e) => closePopup(e)}
          alt="Close popup"
          tabIndex="0"
          onKeyDown={(e) => _handleKeyDownClose(e)}
        />
      </div>
      <div className="popup-instruction-payment">
        {getText(TextId.subscribePayment)}
      </div>
      <div className="card-entry">
        <CardElement options={cardElementOptions} />
      </div>

      {loading ? (
        <div
          style={{
            position: "relative",
            marginBottom: "40px",
            marginTop: "10px",
          }}
        >
          <SpinnerLoader />
        </div>
      ) : (
        <button
          disabled={!stripe || loading}
          id="btn-auth-error-popup-okay"
          tabIndex="0"
          className="subscribe-button"
          onClick={handlePayment}
        >
          Subscribe
        </button>
      )}

      <div>
        <img src={stripePower} alt="Powered by stripe" />
      </div>
    </div>
        </div>
        <div className='elearning__course_info'>
            <div className='elearning__course_card'>
            <div className="course_img">
              <img src={aboutImg} alt="" className="w-100" />
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
        </div>
        <Modal
        isOpen={method}
        style={customStyles}
        contentLabel="payment Methode">
            <div className='elearning__modal'>
                <h4>Select Payment Method</h4>
                <div className='sprt'></div>
                <div className='elearning__modal-button'>
                <button className='master' onClick={() => handlePayment('mastercard')}>
          <RiMastercardFill style={{ color: 'white', fontSize: '30px', marginRight: '1rem', marginBottom: '3px'}} />
          <h4>Debit Or Credit Card</h4>
        </button>
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>Pay ${course.price}</button>
          </form>
                    
                </div>
            </div>
        </Modal> 
        <ToastContainer />   
    </div>
    
  )
}

export default Payment
/*
<PayPalButton createOrder={(data, actions) => createOrder(data,actions)} onApprove={(data, actions) => onApprove(data, actions)}/>
                    <button className='master' onClick={() => {handlePayment('mastercard')}}>
                        <RiMastercardFill style={{ color: 'white', fontSize: '30px', marginRight: '1rem', marginBottom: '3px'}}/>
                        <h4>Debit Or Credit Card</h4>
                    </button>
                    */
