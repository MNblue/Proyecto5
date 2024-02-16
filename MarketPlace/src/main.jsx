import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import User from './views/user/User';
import CardOne from './components/card/CardOne';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<User />} /> */}
        {/* <Route path="/admin" element={<Admin />} /> */}


        <Route path="/" element={<CardOne/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
