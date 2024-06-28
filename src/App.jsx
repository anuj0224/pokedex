import React, { useState } from 'react';
import PokemonList from './PokemonList';
import PokemonDetail from './PokemonDetail';
import './App.css'; // Import the CSS with global styles

const App = () => {
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);

  const handlePokemonSelect = (id) => {
    setSelectedPokemonId(id);
  };

  return (
    <div className="main">
      {selectedPokemonId ? (
        <PokemonDetail 
          pokemonId={selectedPokemonId}
          onBack={() => setSelectedPokemonId(null)}
        />
      ) : (
        <PokemonList onPokemonSelect={handlePokemonSelect} />
      )}
    </div>
  );
};

export default App;
