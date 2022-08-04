import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import { StateContext, State } from './state/State';
import GarageContainer from './pages/Garage/GarageContainer';
import WinnersContainer from './pages/Winners/WinnersContainer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <BrowserRouter>
    <StateContext.Provider value={State}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="garage" element={<GarageContainer />} />
        <Route path="winners" element={<WinnersContainer />} />
      </Routes>
    </StateContext.Provider>
  </BrowserRouter>,
);
