import React from 'react'
import { Link } from 'react-router-dom';
import { SiSololearn } from "react-icons/si";

import './signin.css'

const Register = () => {
  return (
    <>
    <div className='elearning__signin'>
    <div className="elearning__signin-header">
      <div className="elearning__signin-logo">
          <SiSololearn style={{ color: '#17bf9e', fontSize: '30px', marginRight: '5px' }} />
      </div>
      <h1 className="elearning__signin-header-title">Create Account</h1>
      <p className="elearning__signin-header-subtitle">
        Create your account and be part of us
      </p>
    </div>
    <div className="elearning__signin-content">
        <form className="elearning__signin-form">
          <h4> Create your account</h4>
          <div className="input-field">
            <label htmlFor="email" className="input-label">
              Full Name 
            </label>
            <input
              type="text"
              className="input-control"
              id="Name"
              placeholder="Full name"
              autoComplete="off"
              required
            />
          </div>
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
          <div className="input-field">
            <label htmlFor="email" className="input-label">
              Phone number 
            </label>
            <input
              type="text"
              className="input-control"
              id="email"
              placeholder="Phone"
              autoComplete="off"
              required
            />
          </div>
          <button type="submit" className="btn-submit">
            Sign Up
          </button>
        </form>
        <p className="text-center">
        Already have an account?{" "}
          <Link to={"/login"} className="link-text-center">
          Sign In
          </Link>
        </p>
      </div>
      </div>
    </>
  )
}

export default Register
