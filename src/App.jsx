import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import WorkerDashboard from './pages/WorkerDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import Login from './pages/Login';
import WorkerRegistration from './pages/WorkerRegistration';
import WorkerProfile from './pages/WorkerProfile';
import WorkerLogin from './pages/WorkerLogin';
import CustomerRegistration from './pages/CustomerRegistration';
import CustomerProfile from './pages/CustomerProfile';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Worker Routes */}
          <Route path="/worker/login" element={<WorkerLogin />} />
          <Route path="/worker/register" element={<WorkerRegistration />} />
          <Route path="/worker/dashboard" element={<WorkerDashboard />} />
          <Route path="/worker/profile" element={<WorkerProfile />} />

          {/* Customer Routes */}
          <Route path="/customer/register" element={<CustomerRegistration />} />
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/profile" element={<CustomerProfile />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
