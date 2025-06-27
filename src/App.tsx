import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleSignIn = () => {
    // In a real implementation, this would handle GitHub OAuth
    setIsAuthenticated(true);
  };
  return <Router>
      <div className="w-full min-h-screen bg-gray-900 text-white">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignIn onSignIn={handleSignIn} />} />
          <Route path="/dashboard/*" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>;
}