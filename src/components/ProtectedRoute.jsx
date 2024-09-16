import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const userRole = localStorage.getItem('user_role');
  
  if (!userRole) {
    return <Navigate to="/login" />;
  }
  
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }
  
  return <Outlet />;
};

export default ProtectedRoute;
