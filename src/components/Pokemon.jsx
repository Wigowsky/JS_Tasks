const Pokemon = (pokemon) => {
  return (
    <div>
      <h2>{pokemon.pokemon.name}</h2>
      <img src={pokemon.pokemon.imageUrl} />
      <ul>
        <li>Type: {pokemon.pokemon.type}</li>
        <li>Height: {pokemon.pokemon.height}</li>
        <li>Weight: {pokemon.pokemon.weight}</li>
        <li> Gender: {pokemon.pokemon.gender}</li>
        <li>
          Abilities:
          <ul>
            {pokemon.pokemon.abilities.map((ability) => {
              return <li key={ability.slot}>{ability.ability.name}</li>;
            })}
          </ul>
        </li>
        <li>
          Vulnerabilities:
          <ul>
            {pokemon.pokemon.vulnerabilities.map((vulnerability) => {
              return <li key={vulnerability.name}>{vulnerability.name}</li>;
            })}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Pokemon;
