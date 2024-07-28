import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
//import Login from './pages/auth/Signin';
//import Register from './pages/auth/Register';
//import ForgotPassword from './pages/auth/ForgotPassword';
import BaseLayout from './pages/BaseLayout';
import { Login, Insights, Register, ForgotPassword, Profile, AllCourses, StudentCourses, Lessons } from './pages'

import './index.css';
import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const router = createBrowserRouter([
  { path: '/e-learning', element: <App /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/forgotPassword', element: <ForgotPassword /> },
  {
    path: '/dashboard',
    element: <BaseLayout />,
    children: [
      { path: '', element: <Insights /> }, 
      { path: 'insights', element: <Insights /> }, 
      { path: 'test', element: <Insights /> },
      { path: 'profile', element: <Profile /> },
      { path: 'courses', element: <AllCourses /> },
      { path: 'mycourses', element: <StudentCourses /> },
      { path: 'lessons', element: <Lessons /> }
    ]
  }

]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);