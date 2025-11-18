import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './components/LandingPage';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Security from './components/Security';
import Updates from './components/Updates';
import About from './components/About';
import Careers from './components/Careers';
import Press from './components/Press';
import Contact from './components/Contact';
// ...existing code...
import Layout from './components/Layout';
import EnhancedLayout from './components/EnhancedLayout';
import Accounts from './components/Accounts';
import Transactions from './components/Transactions';
import Analytics from './components/Analytics';
import Goals from './components/Goals';
import './App.css';
import MarketTrends from './components/MarketTrends';
import Chatbot from './components/Chatbot';
import EnhancedDashboard from './components/EnhancedDashboard';
import ModernDashboard from './components/ModernDashboard';
import DarkDashboard from './components/DarkDashboard';
import Budgets from './components/Budgets';
import Investments from './components/Investments';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Public Route component (redirect if authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/security" element={<Security />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="/about" element={<About />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/press" element={<Press />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DarkDashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard-modern" element={
          <ProtectedRoute>
            <ModernDashboard />
          </ProtectedRoute>
        } />
        <Route path="/accounts" element={
          <ProtectedRoute>
            <EnhancedLayout>
              <Accounts />
            </EnhancedLayout>
          </ProtectedRoute>
        } />
        <Route path="/transactions" element={
          <ProtectedRoute>
            <EnhancedLayout>
              <Transactions />
            </EnhancedLayout>
          </ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute>
            <EnhancedLayout>
              <Analytics />
            </EnhancedLayout>
          </ProtectedRoute>
        } />
        <Route path="/goals" element={
          <ProtectedRoute>
            <EnhancedLayout>
              <Goals />
            </EnhancedLayout>
          </ProtectedRoute>
        } />
        <Route path="/market-trends" element={
          <ProtectedRoute>
            <EnhancedLayout>
              <MarketTrends />
            </EnhancedLayout>
          </ProtectedRoute>
        } />
        <Route path="/enhanced-dashboard" element={
          <ProtectedRoute>
            <EnhancedLayout>
              <EnhancedDashboard />
            </EnhancedLayout>
          </ProtectedRoute>
        } />
        <Route path="/budgets" element={
          <ProtectedRoute>
            <EnhancedLayout>
              <Budgets />
            </EnhancedLayout>
          </ProtectedRoute>
        } />
        <Route path="/investments" element={
          <ProtectedRoute>
            <EnhancedLayout>
              <Investments />
            </EnhancedLayout>
          </ProtectedRoute>
        } />
      </Routes>
      {isAuthenticated && <Chatbot />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
