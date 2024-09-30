import React, { useState } from 'react'
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; 
import axios from "axios";

import './payment.css'
const CheckoutForm = (props) => {

    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const Stripe = useStripe();
    const elements = useElements();
    const price = props.price
    const courseId = props.courseId
    const clientSecret = props.clientSecret

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token');
        if (!Stripe || !elements) {
            return;
        }
        setIsProcessing(true);
    
        try {
            // Confirm the payment and handle the response
            const { error, paymentIntent } = await Stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/dashboard/mycourses`,
                },
                redirect: 'if_required',
            });
    
            if (paymentIntent && paymentIntent.status === 'succeeded') {
                // Payment succeeded, record the purchase in the backend
                await axios.post(`${process.env.REACT_APP_API_BASE_URL}/payment/confirm-payment`, {
                    paymentIntentId: paymentIntent.id,
                    courseId: courseId,
                }, {
                    headers: {
                      'Authorization': `Bearer ${token}`,
                    },
                  });
    
                toast.success('Payment successful!');
                navigate('/e-learning/mycourses');
            } else if (error) {
                toast.error(`Payment failed: ${error.message}`);
            }
        } catch (err) {
            toast.error('Error processing payment.');
        } finally {
            setIsProcessing(false);
        }
    };
        

  return (
    <div className='elearning__checkout-form'>
    <form onSubmit={handleSubmit}>
        <PaymentElement/>
        <button disabled={isProcessing} className='btn-submit'>
            <span>
                {isProcessing? "Processing ..." : `Pay now ${price}$`}
            </span>
        </button>
        <button type="button" className="btn-back-login" onClick={(e) => {navigate('/e-learning/courses')}}>
            Back To Courses
          </button>
    </form>
    <ToastContainer />
    </div>
  )
}

export default CheckoutForm
