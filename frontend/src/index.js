import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import {GlobalProvider} from "./context/GlobalContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={
        <GlobalProvider>
        <App />
        </GlobalProvider>
        } />
        {/* will redirect all the routes to App
        index.js->app.js->main.js
        */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

