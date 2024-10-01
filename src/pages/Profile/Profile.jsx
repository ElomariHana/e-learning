import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img from "../../assests/images/personne.webp";
import { GrFormView } from "react-icons/gr";
import { GrFormViewHide } from "react-icons/gr";
import './profile.scss';

const Profile = () => {

  const[userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    currentPassword: '',
    password: ''
  });
  const [passwordVisible, setPasswordVisible] = useState(true);


  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData({
      ...userData,
      [id]: value
    });
  };

  const fetchUserData = useCallback(async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setUserData((prevUserData) => ({
        ...prevUserData,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        email: response.data.email,
        phone: response.data.phone,
      }));
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching Data:', error);
    }
  }, []); 
  
  const updateProfile = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const user = JSON.parse(localStorage.getItem('user'));
      const data = {
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        phone: userData.phone,
      };
      if (userData.password) {
        data.password = userData.password;
      }
      // Make API request to update profile
      const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/user/${user.id}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Handle successful response
      if (response.status === 200) {
        toast.success('Successfully updating profile!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        fetchUserData();

      }
    } catch (error) {
      toast.error('Failed to update profile', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      console.error('Error updating profile:', error);
    }};
    useEffect(() => {
      fetchUserData();
    },[fetchUserData]) ;


  return (
    <div className='elearning__profile'>
      <div className='elearning_profile-top'>
        <div className='elearning_profile-top__title'>
        <h4>Profile Settings</h4>
        <p>Change your personal details.</p>
        </div>
        <div>
          <button className='save_changes' type='button' onClick={updateProfile}>Save Changes</button>
        </div>
      </div>
      <div className='elearning__profile-content'>
        <div className='elearning__profile-header'>
          <div className='elearning__profile-image'>
            <img src={img} alt="Profile" />
          </div>
        </div>
        <div className='elearning__profile-form'>
          <div className="input-field">
            <label htmlFor="firstName" className="input-label">First name</label>
            <input type="text" className="input-control" id="first_name" placeholder="First name" autoComplete="off" value={userData.first_name} onChange={handleInputChange} />
          </div>
          <div className="input-field">
            <label htmlFor="lastName" className="input-label">Last name</label>
            <input type="text" className="input-control" id="last_name" placeholder="Last name" autoComplete="off" value={userData.last_name} onChange={handleInputChange} />
          </div>
          <div className="input-field">
            <label htmlFor="email" className="input-label">Email</label>
            <input type="email" className="input-control" id="email" placeholder="Email" autoComplete="off" value={userData.email} onChange={handleInputChange} />
          </div>
          <div className="input-field">
            <label htmlFor="phone" className="input-label">Phone number</label>
            <input type="tel" className="input-control" id="phone" placeholder="Phone number" autoComplete="off" value={userData.phone} onChange={handleInputChange} />
          </div>
        </div>
        <h5>Change your password</h5>
        <div className='elearning__profile-form'>
        <div className="password-wrapper">
                <input
                  type={passwordVisible ? "password":"text"}
                  name="password"
                  id="password"
                  className="input-control"
                  placeholder="Password"
                  autoComplete="off"
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
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Profile;
