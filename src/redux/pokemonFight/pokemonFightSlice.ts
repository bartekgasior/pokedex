import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IPokemonFightSlice {
  pokemon1ID: string | null;
  pokemon2ID: string | null;
}

const initialState: IPokemonFightSlice = {
  pokemon1ID: null,
  pokemon2ID: null,
}

export const pokemonFightSlice = createSlice({
  name: "fight",
  initialState,
  reducers: {
    setPokemon: (state, action: PayloadAction<string>) => {
      if (state.pokemon1ID === null && state.pokemon2ID !== action.payload) {
        state.pokemon1ID = action.payload;
      }

      if (state.pokemon2ID === null && state.pokemon1ID !== action.payload) {
        state.pokemon2ID = action.payload;
      }
    },

    resetPokemon1: (state) => {
      state.pokemon1ID = null
    },

    resetPokemon2: (state) => {
      state.pokemon2ID = null
    },

    resetFight: (state) => {
      state.pokemon1ID = null;
      state.pokemon2ID = null;
    }

  }
})

export const { setPokemon, resetPokemon1, resetPokemon2, resetFight } = pokemonFightSlice.actions;

export default pokemonFightSlice.reducer;