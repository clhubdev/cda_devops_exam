import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        username,
        password
      }, {
        withCredentials: true
      });
      
      alert('Inscription réussie');
    } catch (error) {
      console.error('Erreur d\'inscription', error);
      alert('Erreur d\'inscription');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div>
        <label>Nom d'utilisateur :</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Mot de passe :</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default Login;