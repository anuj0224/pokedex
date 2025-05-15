import React, { useEffect, useState } from 'react';
import backtohome from './assets/back-to-home.svg'
import LoadingSpinner from './assets/Loading';
// import './PokemonDetail.css'

const PokemonDetail = ({ pokemonId, onBack }) => {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonSpecies, setPokemonSpecies] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const [pokemonData, pokemonSpeciesData] = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then((res) => res.json()),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`).then((res) => res.json()),
      ]);
      setPokemon(pokemonData);
      setPokemonSpecies(pokemonSpeciesData);
    };
    fetchPokemonData();
  }, [pokemonId]);

  if (!pokemon || !pokemonSpecies) {
    return <LoadingSpinner/>;
  }

  return (
    <main className="detail-main main">
      <section className='bg'>
      <header className='header1'>
        <div className="header-wrapper">
            <a className="back-btn-wrap" onClick={onBack}> 
            <img
                src={backtohome}
                alt="back to home"
                className="back-btn"
                id="back-btn"
              />
            </a>
            <div className="name-wrap">
            <h1 className="name">{pokemon.name.toUpperCase()}</h1>
            </div>
        </div>
      </header>

      <div className="detail-card-detail-wrapper">
      <div className="detail-img-wrapper">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
          alt={pokemon.name}
        />
      </div>
      <div className="pokemon-info">
        <p>Type: {pokemon.types.map((t) => t.type.name).join(', ')}</p>
        <p>Weight: {pokemon.weight / 10} kg</p>
        <p>Height: {pokemon.height / 10} m</p>
        <ul>
          {pokemon.stats.map((stat) => (
            <li key={stat.stat.name}>
              {stat.stat.name.toUpperCase()}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>
      </div>
      </section>
    </main>
  );
};

export default PokemonDetail;
