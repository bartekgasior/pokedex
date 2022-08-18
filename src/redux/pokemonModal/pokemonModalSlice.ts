import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IPokemonModalState {
  isOpen: boolean;
  pokemonID: string | null
}

const initialState: IPokemonModalState = {
  isOpen: false,
  pokemonID: null
}

export const pokemonModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      state.isOpen = true;
      state.pokemonID = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.pokemonID = null;
    }
  }
})

export const {openModal, closeModal} = pokemonModalSlice.actions;

export default pokemonModalSlice.reducer;