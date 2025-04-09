// pages/auth/ResetPassword.jsx
import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await axios.post(`/api/auth/reset-password/${token}`, { password });
      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/auth/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Reset link is invalid or expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            Reset Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please enter your new password
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {message && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4">
            <p className="text-sm text-green-700">{message}</p>
          </div>
        )}

        <form onSubmit={handleReset} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter new password"
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md 
                  shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                  sm:text-sm transition-all duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md 
                  shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                  sm:text-sm transition-all duration-200"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent 
              text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="inline-flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Resetting...
              </span>
            ) : (
              "Reset Password"
            )}
          </button>

          <div className="text-center">
            <Link 
              to="/auth/login"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
            >
              ← Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
