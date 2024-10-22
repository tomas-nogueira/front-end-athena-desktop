import React from 'react';
import { Navigate } from 'react-router-dom';

export default function  ProtectedRoute ({ element, requiredRole })  {
  const token = localStorage.getItem('token'); 
  const userRole = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/access-denied" replace />;
  }

  return element;
};


