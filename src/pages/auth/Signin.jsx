import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { SiSololearn } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
import { useNavigation } from '../../context/NavigationContext'
import { GrFormView } from "react-icons/gr";
import { GrFormViewHide } from "react-icons/gr";
import { MdErrorOutline } from "react-icons/md";
import './signin.css'

const Signin = () => {

  const navigate = useNavigate();
  const { navigationState } = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      const userRole = data.role[0].name;

      if (response.ok) {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('user_role', userRole);
        console.log('userRole', userRole);
        if (userRole === 'admin') {
          navigate('/admin/insights');
        } else if (userRole === 'student') {
          const { intendedAction, courseId } = navigationState || {};
          const redirectPath = intendedAction === 'buyCourse' ? `/payment/${courseId}` : '/e-learning/courses';
          navigate(redirectPath);
        } else {
          navigate('/e-learning/courses'); 
        }
      } else {
        setError('An error occurred. Please try again later.')
      }
    } catch (error) {
      console.log('userRole', error);
      setError('Email or password incorrect!')
    }
  };

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
        <form onSubmit={handleSignIn} className="elearning__signin-form">
          <h4> Login to your account</h4>
          {error && <div className='error_msg'><MdErrorOutline style={{ fontSize: '20px', marginRight: '5px' }}/>{error}</div>}
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
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <div className="password-wrapper">
                <input
                  type={passwordVisible ? "password":"text"}
                  name="password"
                  id="password"
                  className="input-control"
                  placeholder="Password"
                  autoComplete="off"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <span
                  className="password-toggle-icon"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <GrFormViewHide /> : <GrFormView />}
                </span>
              </div>
          </div>
          <div className="flex-end">
            <Link to={"/forgotPassword"} className="link-end">
              <p className='link-end'>Forgot password?</p>
            </Link>
          </div>
          <button type="submit" className="btn-submit">
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
