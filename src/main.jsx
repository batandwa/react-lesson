import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import './index.css';
import App from './App.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Event from './pages/Event.jsx';
import { Container } from 'react-bootstrap';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
  </StrictMode>
)
