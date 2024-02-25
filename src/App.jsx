import { useState } from "react";
import "./App.css";
import Pokemon from "./components/Pokemon";

function App() {
  const [pokemonId, setPokemonId] = useState(1);
  const [pokemons, setPokemons] = useState([]);

  function handleInputChange(e) {
    if (e.target.value <= 310) {
      setPokemonId(e.target.value);
    } else {
      console.log("Wrong Value!");
    }
  }

  async function getPokemon(id) {
    try {
      let source = `https://pokeapi.co/api/v2/pokemon/${id}`;
      let response = await fetch(source);
      let mainData = await response.json();
      let genderSource = `https://pokeapi.co/api/v2/pokemon-species/${mainData.name}`;
      let typeSource = `https://pokeapi.co/api/v2/type/${mainData.types[0].type.name}`;
      let genderName = null;

      response = await fetch(genderSource);
      let genderData = await response.json();
      if (genderData.gender_rate == 1) {
        genderName = "female";
      } else if (genderData.gender_rate == 2) {
        genderName = "male";
      } else {
        genderName = "genderless";
      }

      response = await fetch(typeSource);
      let typeData = await response.json();

      setPokemons((prevPokemons) => [
        ...prevPokemons,
        {
          id: mainData.id,
          name: mainData.name,
          type: mainData.types[0].type.name,
          height: mainData.height,
          weight: mainData.weight,
          abilities: mainData.abilities,
          imageUrl: mainData.sprites.front_default,
          gender: genderName,
          vulnerabilities: typeData.damage_relations.double_damage_from,
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h1>Choose your Poke</h1>
      <h3>Remember to choose 6 pokemons</h3>
      {pokemons.length <= 6 ? (
        <>
          <input
            type="number"
            onChange={handleInputChange}
            value={pokemonId}
            min="1"
            max="310"
          ></input>
          <button
            onClick={() => {
              getPokemon(pokemonId);
            }}
          >
            I choose You!
          </button>
        </>
      ) : (
        <p>No more room for Pokemons!</p>
      )}
      {pokemons.length == 0 ? (
        <p>No pokemons choosen</p>
      ) : (
        // <Pokemon pokemon={pokemons[0]} />
        pokemons.map((pokemon) => (
          <Pokemon key={pokemon.id} pokemon={pokemon} />
        ))
      )}
    </>
  );
}

export default App;

// async function getPokemon(id) {
//   let source = `https://pokeapi.co/api/v2/pokemon/${id}`;
//   await fetch(source)
//     .then((response) => response.json())
//     .then((data) => {
//       setPokemons((prevPokemons) => [
//         ...prevPokemons,
//         {
//           id: data.id,
//           name: data.name,
//           type: data.types[0].type.name,
//           height: data.height,
//           weight: data.weight,
//           abilities: data.abilities,
//           imageUrl: data.sprites.front_default,
//         },
//       ]);
//     })

//     //name ,data.types[0].type.name, height, weight, abilities
//     .catch((err) => console.log(err));
// }
