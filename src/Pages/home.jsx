import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './home.css';


const PokemonListItem = ({ id, name, image, types }) => (
  <div className='card'>
    <img src={ image } alt={ name } />
    <p>#{ id }</p>
    <p>{ name }</p>
    <ul className='type-container-home'>{ types }</ul>
  </div>
);

PokemonListItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  types: PropTypes.string.isRequired
};

const Home = () => {
  const [pokemonDataList, setPokemonDataList] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const promises = Array.from({ length: 40 }, (_, index) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}/`)
          .then((response) => response.json())
        );

        const pokemonDataArray = await Promise.all(promises);
        setPokemonDataList(pokemonDataArray);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemonData();
  }, []);

  return (
    <div className='main'>
      <div className='container'>
        <h1 className='heading'>Pokedex</h1>
        <span className='line'></span>
        <div className='box'>
          {pokemonDataList.map((pokemon) => (
          <div key={ pokemon.id } className='card'>
            <Link to={`/pokemon/${pokemon.id}`}>
              <PokemonListItem            
                id={ pokemon.id }
                name={ pokemon.name }
                image={ pokemon.sprites.front_default }
                types={ pokemon.types.map((type, index) => (
                  <li key={ index } className='type-home'>{ type.type.name }</li>
                ))}
              />
            </Link>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
