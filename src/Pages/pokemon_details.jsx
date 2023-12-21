import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import './pokemon_details.css';


const Pokemon = () => {
  const [pokemonData, setPokemonData] = useState(null);
  const { id: pokemonId } = useParams(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
        if (!response.ok) {
          console.log(`Failed to fetch data for Pokémon ${pokemonId}`);
        }
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemonData();
  }, [pokemonId]);

  if (!pokemonData) {
    return <p>Loading...</p>;
  }

  const { id, name, sprites, abilities, types } = pokemonData;

  return (
    <>
      <div className='box-details'>
        <div className='card-details'>
          <img src={sprites.front_default} alt={name} />    
          <p>#{id}</p>
          <h2>{name}</h2>
          <p>Abilities:</p>
          <ul>
            {abilities.map((ability, index) => (
              <li key={index}>{ability.ability.name}</li>
            ))}
          </ul>
          <ul className='type-container'>
            {types.map((type, index) => (
              <li className='type' key={index}>{type.type.name}</li>
            ))}
          </ul>
        </div>
        <Link to={'/'} className='type home-btn'>Home</Link>
      </div>
    </>
  );
};

export default Pokemon;
