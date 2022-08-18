import { store } from 'redux/store';
import { setPokemonsList } from 'redux/pokedex/pokedexSlice';

describe('main page tests', () => {

  it('should be empty on load', () => {
    const pokedex = store.getState().pokedex;
    expect(pokedex.pokemons.length).toBe(0);
  })

  it('render page without pokemons', async () => {
    const result = store.dispatch(setPokemonsList([]));
    const pokemons = result.payload;

    expect(pokemons.length).toBe(0);
  });
});
