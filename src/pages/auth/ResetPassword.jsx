import React, { useState } from 'react'
import { SiSololearn } from "react-icons/si";
import { useNavigate } from 'react-router-dom'; 
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { GrFormView } from "react-icons/gr";
import { GrFormViewHide } from "react-icons/gr";
import './signin.css'

const ResetPassword = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');
  const token = queryParams.get('token');
  const [modalState, setModalState] = useState({
    password: '',
    confirmPassword: '',
    email: '',
    errors: {},
  });
  const [passwordVisible, setPasswordVisible] = useState(true);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setModalState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }
  const validateForm = () => {
    const errors = {};
    if (!modalState.password) {
      errors.password = 'Password is required';
    }
    if (!modalState.confirmPassword) {
        errors.confirmPassword = 'Confirm password is required';
      }
      if (modalState.password !== modalState.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    return errors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/reset-password`, {
          token: token,
          email: email, // Assuming you have an input for email
          password: modalState.password,
          password_confirmation: modalState.confirmPassword,
        });

        if (response.data.message === 'Password changed successfully.') {
          navigate('/login'); // Redirect to login page
        }
      } catch (error) {
        setModalState((prevState) => ({
          ...prevState,
          errors: { apiError: error.response.data.message || 'An error occurred' },
        }));
      }
    } else {
      setModalState((prevState) => ({
        ...prevState,
        errors: validationErrors,
      }));
    }
  };
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
        <form className="elearning__signin-form">
          <h1 className="elearning__signin-header-title">Forgot your password?</h1>
          <p className="elearning__signin-header-subtitle">
            Enter your new password below to reset your password.
          </p>
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
                  value={modalState.password}
                  onChange={handleInputChange}
                  required
                />
                <span
                  className="password-toggle-icon"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <GrFormViewHide /> : <GrFormView />}
                </span>
              </div>
              {modalState.errors.password && (
                <p className="error-message">
                  *{modalState.errors.password}
                </p>
              )}
          </div>
          <div className="input-field">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <div className="password-wrapper">
                <input
                  type={passwordVisible ? "confirmPassword":"text"}
                  name="confirmPassword"
                  id="confirmPassword"
                  className="input-control"
                  placeholder="Confirm Password"
                  autoComplete="off"
                  value={modalState.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                <span
                  className="password-toggle-icon"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <GrFormViewHide /> : <GrFormView />}
                </span>
            </div>
            {modalState.errors.confirmPassword && (
                <p className="error-message">
                  *{modalState.errors.confirmPassword}
                </p>
              )}
          </div>
          <button type="submit" className="btn-submit" onClick={handleSubmit}>
            Reset Password
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default ResetPassword
