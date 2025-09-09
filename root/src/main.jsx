import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
// import { register } from './serviceWorkerRegistration';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Service Worker'ı geliştirme sırasında devre dışı bırak
// register();
