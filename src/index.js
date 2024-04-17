import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './report-web-vitals';
import App from './app';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter basename='https://kxmohelo.github.io/GetOffGrid/'>
    <Suspense fallback={<div >Loading</div>}>
      <App />
    </Suspense>
  </BrowserRouter>
);

reportWebVitals();
