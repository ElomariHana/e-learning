import React from 'react'
import { Link } from 'react-router-dom';
import { SiSololearn } from "react-icons/si";
import { useNavigate } from 'react-router-dom'; 

import './signin.css'

const Signin = () => {
  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate('/dashboard')
  }
  return (
    <>
    <div className='elearning__signin'>
    <div className="elearning__signin-header">
      <div className="elearning__signin-logo">
          <SiSololearn style={{ color: '#17bf9e', fontSize: '30px', marginRight: '5px' }} />
      </div>
      <h1 className="elearning__signin-header-title">Welcome to NetSecCloud</h1>
      <p className="elearning__signin-header-subtitle">
        Sign-in to your account and start the adventure
      </p>
    </div>
    <div className="elearning__signin-content">
        <form className="elearning__signin-form">
          <h4> Login to your account</h4>
          <div className="input-field">
            <label htmlFor="email" className="input-label">
              Email 
            </label>
            <input
              type="text"
              className="input-control"
              id="email"
              placeholder="Email"
              autoComplete="off"
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="input-control"
              placeholder="Password"
              autoComplete="off"
              required
            />
          </div>
          <div className="flex-end">
            <Link to={"/forgotPassword"} className="link-end">
              <p className='link-end'>Forgot password?</p>
            </Link>
          </div>
          <button type="submit" className="btn-submit" onClick={handleSignIn}>
            Sign in
          </button>
        </form>
        <p className="text-center">
          New on our platform?{" "}
          <Link to={"/register"} className="link-text-center">
            Create account here
          </Link>
        </p>
      </div>
      </div>
    </>
  )
}

export default Signin
