import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import BaseLayout from './pages/BaseLayout';
import { NavigationProvider } from './context/NavigationContext'
import { Login, Insights, Register, ForgotPassword, Profile, AllCourses, StudentCourses, Lessons, Tutorial, ManageCourses, Transactions, Payment, ResetPassword } from './pages'
import { ProtectedRoute, Unauthorized } from './components'

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import './index.css';
import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const stripePromise = loadStripe('pk_test_51PuKBkDZoBvvo4QND6sJaBB0oumKqoEt5rG246OgiGIyZeMso7bcVbi14SNM8GJXX5XTHPaupvhBXNsfTHvYE0FJ00UWZmHO9M');

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/forgotPassword', element: <ForgotPassword /> },
  { path: '/reset-password', element: <ResetPassword /> },
  { path: '/payment/:courseId', element: <Payment /> },
  { path: '/unauthorized', element: <Unauthorized /> },
  {
    path: '/admin',
    element: <BaseLayout />,
    children: [
      {
        element: <ProtectedRoute allowedRoles={['admin']} />,
        children: [
          { path: 'manage_courses', element: <ManageCourses /> },
          { path: 'insights', element: <Insights /> },
          { path: 'lessons/:courseId', element: <Lessons /> },
          { path: 'transactions', element: <Transactions /> }
        ]
      }
    ]
  },
  {
    path: '/e-learning',
    element: <BaseLayout />,
    children: [
      {
        element: <ProtectedRoute allowedRoles={['student']} />,
        children: [
          { path: 'profile', element: <Profile /> },
          { path: 'courses', element: <AllCourses /> },
          { path: 'mycourses', element: <StudentCourses /> },
          { path: 'tutorial/:courseId', element: <Tutorial /> },
        ]
      }
    ]
  },
]);

ReactDOM.render(
  <React.StrictMode>
      <NavigationProvider>
        <Elements stripe={stripePromise}>
          <RouterProvider router={router} />
        </Elements>
      </NavigationProvider>
    </React.StrictMode>,
  document.getElementById('root')
);