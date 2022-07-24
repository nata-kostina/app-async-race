import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import Garage from './pages/Garage/Garage';
import Winners from './pages/Winners';
import Example from './pages/Test';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Example />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="garage" element={<Garage />} />
        <Route path="winners" element={<Winners />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
