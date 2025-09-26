import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import TouristRecords from './pages/TouristRecords';
import TouristDetail from './pages/TouristDetail';
import Incidents from './pages/Incidents';
import Analytics from './pages/Analytics';
import Layout from './components/layout/Layout';
export function App() {
  return <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Layout>
              <Dashboard />
            </Layout>} />
        <Route path="/tourist-records" element={<Layout>
              <TouristRecords />
            </Layout>} />
        <Route path="/tourist-records/:id" element={<Layout>
              <TouristDetail />
            </Layout>} />
        <Route path="/incidents" element={<Layout>
              <Incidents />
            </Layout>} />
        <Route path="/analytics" element={<Layout>
              <Analytics />
            </Layout>} />
      </Routes>
    </BrowserRouter>;
}