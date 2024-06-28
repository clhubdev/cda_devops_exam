import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {

    const [pokemons, setPokemons] = useState([]);
    
    const fetchAllPokemons = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/pokemons', {
                withCredentials: true // important pour envoyer et recevoir les cookies
            });

            setPokemons(response.data.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des Pokémon', error);
            alert('Erreur lors de la récupération des Pokémon');
        }
    };

    useEffect(() => {
        fetchAllPokemons();
    }, []) 

    return (
        <div>
            <h1>Pokémon, attrapez-les tous v10</h1>
            <h2>Liste de l'ensemble des pokémons</h2>
            <ul>
                {pokemons.length > 0 && pokemons.map(pokemon => (
                    <li key={pokemon.id}>{pokemon.name}</li>
                ))}
            </ul>
        </div>
    )
}
