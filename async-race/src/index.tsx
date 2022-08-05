import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Main from './pages/Main/Main';
import { StateContext, State } from './state/State';
import GaragePage from './pages/Garage/GaragePage';
import WinnersContainer from './pages/Winners/WinnersPage';
import GlobalStyle from './styles/GlobalStyles';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <BrowserRouter>
    <GlobalStyle />
    <StateContext.Provider value={State}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="garage" element={<GaragePage />} />
        <Route path="winners" element={<WinnersContainer />} />
      </Routes>
    </StateContext.Provider>
  </BrowserRouter>,
);
