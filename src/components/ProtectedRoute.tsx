// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  if (!isAuthenticated()) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
