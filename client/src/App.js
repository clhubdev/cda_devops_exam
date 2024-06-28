import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'

function App() {

  const [apiResponse, setApiResponse] = useState('');

  function callAPI() {
    fetch('http://localhost:3000/api/pokemons', {
      headers: {
        'Authorization': 'Bearer VOTRE_JETON_D_AUTHENTIFICATION' // Remplacez VOTRE_JETON_D_AUTHENTIFICATION par votre vrai jeton
      }
    })
      .then(res => res.text())
      .then(res => setApiResponse(res))
      .catch(error => console.log(error));
  }

  useEffect(() => {
    callAPI();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {apiResponse}
        </p>
        <p>
          Ceci est un test de volume 7
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
