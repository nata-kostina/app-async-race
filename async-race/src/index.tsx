import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Main from './pages/Main/Main';
import GaragePage from './pages/Garage/GaragePage';
import WinnersPage from './pages/Winners/WinnersPage';
import GlobalStyle from './styles/GlobalStyles';
import StateProvider from './state/StateProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <StateProvider>
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="garage" element={<GaragePage />} />
        <Route path="winners" element={<WinnersPage />} />
      </Routes>
    </BrowserRouter>
  </StateProvider>,
);
