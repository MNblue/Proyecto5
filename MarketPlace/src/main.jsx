import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import User from './views/user/User';
import CardOne from './components/card/CardOne';
import CardDetail from './components/card/CardDetail';
import Admin from './views/admin/Admin';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="463077361108-j5fj2hqporlk34jgon97gkml7esm2vk6">
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<User />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/CardOne" element={<CardOne />} />
          <Route path="/CardDetail" element={<CardDetail />} />

        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode >,
)
