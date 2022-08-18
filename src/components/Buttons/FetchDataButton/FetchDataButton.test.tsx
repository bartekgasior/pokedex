import { render, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import FetchDataButton from "components/Buttons/FetchDataButton";
import { Provider } from 'react-redux';
import { fetchPokedexPage, setPokemonsList } from 'redux/pokedex/pokedexSlice';
import { store } from 'redux/store';
import { URL } from 'services/PokemonService';

const listResponse = { data: [{ id: 'id1', name: 'name1', types: ['Fire'] }] };

describe('fetch data btn', () => {

  beforeAll(() => {
    const mock = new MockAdapter(axios);
    mock.onGet(`${URL}/cards?page=1;pageSize=24`).reply(200, listResponse);
  });

  it('should show spinner while fetching', () => {
    render(
      <Provider store={store}>
        <FetchDataButton isFetching={true} onClick={() => { }} />
      </Provider>
    );
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  })

  it('should not show spinner while not fetching', () => {
    render(
      <Provider store={store}>
        <FetchDataButton isFetching={false} onClick={() => { }} />
      </Provider>
    );
    const spinner = screen.queryByTestId('spinner');
    expect(spinner).not.toBeInTheDocument();
  })

  it('should be empty when no pokemons loaded', () => {
    const pokedex = store.getState().pokedex;
    expect(pokedex.pokemons.length).toBe(0);

    render(
      <Provider store={store}>
        <FetchDataButton isFetching={false} onClick={() => { }} />
      </Provider>
    );

    const addBtn = screen.queryByRole('button');
    expect(addBtn).not.toBeInTheDocument();
  })

  it('should show btn when pokemons are loaded', async () => {

    store.dispatch(setPokemonsList([{ id: 'id', name: 'name', types: ['Fire'] }]));
    const pokedex = store.getState().pokedex;
    expect(pokedex.pokemons.length).toBe(1);

    render(
      <Provider store={store}>
        <FetchDataButton isFetching={false} onClick={() => null} />
      </Provider>
    );

    const addBtn = screen.getByRole('button');
    expect(addBtn).toBeInTheDocument();
  })

  it('should be able to fetch new data on expand button click', async () => {
    store.dispatch(setPokemonsList([]));
    const result = await store.dispatch(fetchPokedexPage());
    expect(result.type).toBe('pokemons/fetchPage/fulfilled');
    expect(result.payload).toEqual(listResponse.data);

    const pokemons = store.getState().pokedex.pokemons;
    expect(pokemons).toEqual(listResponse.data);
  })

})