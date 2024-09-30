import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { SiSololearn } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
import { useNavigation } from '../../context/NavigationContext'
import { GrFormView } from "react-icons/gr";
import { GrFormViewHide } from "react-icons/gr";
import { MdErrorOutline } from "react-icons/md";
import './signin.css'

const Register = () => {
  
  const navigate = useNavigate();
  const { navigationState } = useNavigation();

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});

  const isFormValid = () => {
    const newErrors = {};
    
    if (!first_name.trim()) newErrors.first_name = 'First name is required';
    if (!last_name.trim()) newErrors.last_name = 'Last name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(phone)) newErrors.phone = 'Phone number must be 10 digits';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };



  const handleSignup = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      return; 
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name, last_name, email, password, phone }),
      });

      const data = await response.json();
      const userRole = data.role[0].name;

      if (response.ok) {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('user_role', userRole);
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
      setError('An error occurred. Please try again later.')
    }
  };

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
        <form onSubmit={handleSignup} className="elearning__signin-form">
        {error && <p className="error-message"><MdErrorOutline style={{fontSize: '20px', marginRight: '5px', marginBottom:'2px'}}/>{error}</p>}
          <h4> Create your account</h4>
          <div className="input-field">
            <label htmlFor="first_name" className="input-label">
              First Name 
            </label>
            <input
              type="text"
              className="input-control"
              id="first_name"
              placeholder="first_name"
              autoComplete="off"
              value={first_name}
              onChange={e => setFirstName(e.target.value)}
              required
            />
            {errors.first_name && <p className="error-message">*{errors.first_name}</p>}
          </div>
          <div className="input-field">
            <label htmlFor="last_name" className="input-label">
              Last Name 
            </label>
            <input
              type="text"
              className="input-control"
              id="last_name"
              placeholder="Last name"
              autoComplete="off"
              value={last_name}
              onChange={e => setLastName(e.target.value)}
              required
            />
            {errors.last_name && <p className="error-message">*{errors.last_name}</p>}
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
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            {errors.email && <p className="error-message">*{errors.email}</p>}
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
              {errors.password && <p className="error-message">*{errors.password}</p>}
          </div>
          <div className="input-field">
            <label htmlFor="phone" className="input-label">
              Phone number 
            </label>
            <input
              type="text"
              className="input-control"
              id="phone"
              placeholder="Phone"
              autoComplete="off"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
            />
            {errors.phone && <p className="error-message">*{errors.phone}</p>}
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
