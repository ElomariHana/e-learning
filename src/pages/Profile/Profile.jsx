import React from 'react';
import img from "../../assests/images/personne.webp";
import './profile.scss';

const Profile = () => {
  return (
    <div className='elearning__profile'>
      <div className='elearning_profile-top'>
        <div className='elearning_profile-top__title'>
        <h4>Profile Settings</h4>
        <p>Change your personal details.</p>
        </div>
        <div>
          <button className='save_changes' type='button'>Save Changes</button>
        </div>
      </div>
      <div className='elearning__profile-content'>
        <div className='elearning__profile-header'>
          <div className='elearning__profile-image'>
            <img src={img} alt="Profile" />
          </div>
          <div className='elearning__profile-buttons'>
            <button className="upload_image" type="button">Upload image</button>
            <button className="delete_image" type="button">Delete image</button>
          </div>
        </div>
        <div className='elearning__profile-form'>
          <div className="input-field">
            <label htmlFor="firstName" className="input-label">First name</label>
            <input type="text" className="input-control" id="firstName" placeholder="First name" autoComplete="off" required />
          </div>
          <div className="input-field">
            <label htmlFor="lastName" className="input-label">Last name</label>
            <input type="text" className="input-control" id="lastName" placeholder="Last name" autoComplete="off" required />
          </div>
          <div className="input-field">
            <label htmlFor="email" className="input-label">Email</label>
            <input type="email" className="input-control" id="email" placeholder="Email" autoComplete="off" required />
          </div>
          <div className="input-field">
            <label htmlFor="phone" className="input-label">Phone number</label>
            <input type="tel" className="input-control" id="phone" placeholder="Phone number" autoComplete="off" required />
          </div>
        </div>
        <h5>Change your password</h5>
        <div className='elearning__profile-form'>
          <div className="input-field">
            <label htmlFor="currentPassword" className="input-label">Password</label>
            <input type="password" className="input-control" id="currentPassword" placeholder="Current password" autoComplete="off" required />
          </div>
          <div className="input-field">
            <label htmlFor="newPassword" className="input-label">New password</label>
            <input type="password" className="input-control" id="newPassword" placeholder="New password" autoComplete="off" required />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
