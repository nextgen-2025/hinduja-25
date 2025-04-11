import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Navbar from "./components/navbar/Navbar";

// Layout component to handle Navbar rendering
const Layout = ({ children }) => {
  const location = useLocation();
  
  const isAuthRoute = (pathname) => {
    return pathname.startsWith('/auth/') || pathname.startsWith('/reset-password/');
  };

  return (
    <>
      {!isAuthRoute(location.pathname) && <Navbar />}
      <main className={!isAuthRoute(location.pathname) ? 'pt-20' : ''}>
        {children}
      </main>
    </>
  );
};

function App() {
  return (
    <Router>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <Layout>
        <Routes>
          {/* Auth Routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          
          {/* Protected Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
