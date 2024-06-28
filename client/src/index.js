import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from './pages/Login';
import axios from 'axios';


const root = ReactDOM.createRoot(document.getElementById('root'));

let allCookies = document.cookie;

function getCookieValue(name) {
  // Séparer les cookies en un tableau
  const cookies = document.cookie.split('; ');
  // Rechercher le cookie avec le nom spécifié
  for (let cookie of cookies) {
      // Vérifier si le cookie commence par le nom spécifié
      if (cookie.startsWith(name + '=')) {
          // Retourner la valeur du cookie (la partie après le signe '=')
          return cookie.split('=')[1];
      }
  }
  // Si le cookie n'est pas trouvé, retourner null ou une chaîne vide
  return null;
}

axios.interceptors.request.use(
  config => {

    const token = getCookieValue('jwt');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

root.render(
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
