import React, { useState } from 'react'
import { SiSololearn } from "react-icons/si";
import { useNavigate } from 'react-router-dom'; 
import axios from "axios";
import { MdReportGmailerrorred } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import './signin.css'

const ForgotPassword = () => {

  const navigate = useNavigate();
  const[message, setMessage] = useState('');
  const[error, setError] = useState('');
  const[email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSignIn = () => {
    navigate('/login')
  }
  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = 'Email is required';
    }
    return errors;
  };
  const handleSubmit = async (e) => {

    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/forgot-password`, {
          email,
        });
        setMessage(response.data.message);
        setError('');
    } catch (error) {
      setError(error.response.data.message);
      setMessage('');
    }finally {
      setLoading(false); 
    }
    }};
  return (
    <>
    <div className="elearning__signin">
      <div className="elearning__signin-header">
        <div className="elearning__signin-logo">
          <SiSololearn style={{ color: '#17bf9e', fontSize: '30px', marginRight: '5px' }} />
        </div>
        <h1 className="elearning__signin-header-title">NetSecCloud</h1>
      </div>
      <div className="elearning__signin-content">
        <form className="elearning__signin-form" onSubmit={handleSubmit}>
        {error && <div className='error_msg'><MdReportGmailerrorred style={{ fontSize: '20px', marginRight: '5px' }}/>{error}</div>}
        {message && <div className='valid_msg'>{message}</div>}
        {loading && <div className='loading_msg'> <AiOutlineLoading3Quarters /> Processing...</div>} {/* Loading message */}
          <h1 className="elearning__signin-header-title">Forgot your password?</h1>
          <p className="elearning__signin-header-subtitle">
            Enter your email address below to receive a link to reset your password.
          </p>
          <div className="input-field">
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <input
              type="text"
              className="input-control"
              id="email"
              placeholder="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-submit">
            Reset Password
          </button>
          <div className="elearning_separated">
            <div></div>
            <p className="text-center">OR</p>
            <div></div>
          </div>
          <button type="button" className="btn-back-login" onClick={handleSignIn}>
            Back To Login
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default ForgotPassword
