import "./styles/middlebar.css";
import Login from "./pages/login";
import React, { useEffect } from "react";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

import { useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== "/") {
      localStorage.removeItem("x-access-token");
    }
  }, [location]);

  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
