import { BrowserRouter, Route, Routes } from 'react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './globals.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthProvider';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Subscriptions from './pages/Subscriptions';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
