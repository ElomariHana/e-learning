import React from 'react'
import { SiSololearn } from "react-icons/si";
import { useNavigate } from 'react-router-dom'; 

import './signin.css'

const ForgotPassword = () => {

  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate('/login')
  }
  return (
    <>
    <div className='elearning__signin'>
    <div className="elearning__signin-header">
      <div className="elearning__signin-logo">
          <SiSololearn style={{ color: '#17bf9e', fontSize: '30px', marginRight: '5px' }} />
      </div>
      <h1 className="elearning__signin-header-title">NetSecCloud</h1>
    </div>
    <div className="elearning__signin-content">
        <form className="elearning__signin-form">
        <h1 className="elearning__signin-header-title">Forgot your password?</h1>
        <p className="elearning__signin-header-subtitle">Enter your email address below to receive a link to reset your password.</p>
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
              required
            />
          </div>
          <button type="submit" className="btn-submit">
            Reset Password
          </button>
          <div className='elearning_separated'>
            <div></div>
            <p className="text-center">OR</p>
            <div></div>
          </div>
          <button type="submit" className="btn-back-login" onClick={handleSignIn}>
            Back To Login
          </button>
        </form>
      </div>
      </div>
    </>
  )
}

export default ForgotPassword
