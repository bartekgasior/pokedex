import { configureStore, Action } from "@reduxjs/toolkit";
import pokedexReducer from './pokedex/pokedexSlice';
import modalReducer from './pokemonModal/pokemonModalSlice';
import fightReducer from './pokemonFight/pokemonFightSlice';
import { ThunkAction } from 'redux-thunk';

export const store = configureStore({
    reducer: {
        pokedex: pokedexReducer,
        modal: modalReducer,
        fight: fightReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;