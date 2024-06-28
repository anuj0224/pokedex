import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';

import pokeball from './assets/pokeball.svg'
import LoadingSpinner from './assets/Loading';

const MAX_POKEMON = 500;

const PokemonList = ({ onPokemonSelect }) => {

    const [loading, setLoading] = useState(true);
    const [pokemons, setPokemons] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');

    useEffect(() => {
        const fetchPokemons = async () => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`);
        const data = await response.json();
        setPokemons(data.results);
        };
        fetchPokemons();
        setTimeout(() => {
            setLoading(false);
          }, 1000);
    }, []);



    const filteredPokemons = pokemons.filter((pokemon) => {
        const pokemonName = pokemon.name.toLowerCase();
        return (
        (sortBy === 'name' && pokemonName.startsWith(searchTerm))
        );
    });

    return (
        <>
            {loading ? <LoadingSpinner /> : 
                <main className="main"> 
                <header className="header home"> 
                    <div className='container'>
                        <div className="logo-wrapper">
                            <img src={pokeball} alt="pokeball" />
                            <h1>Pokedex</h1>
                        </div>
                        <div className="search-wrapper">
                            <SearchBar
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            />
                        </div>
                    </div>
                    <div className="list-wrapper">
                    {filteredPokemons.map((pokemon) => {
                        const pokemonId = pokemon.url.split('/')[6];
                        return (
                        <div
                            key={pokemonId}
                            className="list-item"
                            onClick={() => onPokemonSelect(pokemonId)}
                        >
                            <div className="number-wrap">
                            
                            </div>
                            <div className="img-wrap">
                            <img
                                src={`https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
                                alt={pokemon.name}
                            />
                            </div>
                            <div className="name-wrap">
                            <p className="body3-fonts">{pokemon.name}</p>
                            </div>
                        </div>
                        );
                    })}
                    </div>
                </header>
                </main>
            }

        </>
  );
};

export default PokemonList;
