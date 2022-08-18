import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import * as PokemonService from 'services/PokemonService';
import IPokemon from 'interfaces/Pokemon';
import { RootState } from "redux/store";
import { TPokemonType } from "interfaces/PokemonType";

interface ITypeCB {
	id: number,
	value: TPokemonType,
	isChecked: boolean
}

const types: ITypeCB[] = [
	{ id: 0, value: "Colorless", isChecked: false },
	{ id: 1, value: "Darkness", isChecked: false },
	{ id: 2, value: "Dragon", isChecked: false },
	{ id: 3, value: "Fairy", isChecked: false },
	{ id: 4, value: "Fighting", isChecked: false },
	{ id: 5, value: "Fire", isChecked: false },
	{ id: 6, value: "Grass", isChecked: false },
	{ id: 7, value: "Lightning", isChecked: false },
	{ id: 8, value: "Metal", isChecked: false },
	{ id: 9, value: "Psychic", isChecked: false },
	{ id: 10, value: "Water", isChecked: false },
]

export interface IPokedexState {
	pokemons: IPokemon[],
	pageNumber: number,
	pageSize: number,
	isFetching: boolean,
	isSearch: boolean,
	searchValue: string,
	selectedTypes: ITypeCB[]
}

const initialState: IPokedexState = {
	pokemons: [],
	pageNumber: 1,
	pageSize: 24,
	isFetching: false,
	isSearch: false,
	searchValue: '',
	selectedTypes: types
}

export const fetchPokedexPage = createAsyncThunk<IPokemon[], void, { state: RootState }>(
	'pokemons/fetchPage',
	async (_, { getState }) => {
		const state = getState();

		const response = await PokemonService.getAll(state.pokedex.pageNumber, state.pokedex.pageSize);
		return response.data
	}
)

export const searchPokedex = createAsyncThunk<IPokemon[], void, { state: RootState }>(
	'pokemons/search',
	async (_, { getState }) => {
		const state: RootState = getState();

		const response = await PokemonService.getByQuery(
			state.pokedex.searchValue,
			state.pokedex.selectedTypes.filter(({ isChecked }) => isChecked).map(({ value }) => value),
			1,
			state.pokedex.pageSize
		);
		return response.data
	}
)

export const searchPokedexNextPage = createAsyncThunk<IPokemon[], void, { state: RootState }>(
	'pokemons/searchNextPage',
	async (_, { getState }) => {
		const state: RootState = getState();

		const response = await PokemonService.getByQuery(
			state.pokedex.searchValue,
			state.pokedex.selectedTypes.filter(({ isChecked }) => isChecked).map(({ value }) => value),
			state.pokedex.pageNumber,
			state.pokedex.pageSize
		);
		return response.data
	}
)

export const clearPokedex = createAsyncThunk<IPokemon[], void, { state: RootState }>(
	'pokemons/clearPokedex',
	async (_, { getState }) => {
		const state = getState();
		const response = await PokemonService.getAll(1, state.pokedex.pageSize);
		return response.data
	}
)

export const pokedexSlice = createSlice({
	name: 'pokedex',
	initialState,
	reducers: {
		setPokemonsList: (state, action: PayloadAction<IPokemon[]>) => {
			state.pokemons = action.payload
		},
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload
		},
		setSelectedTypes: (state, action: PayloadAction<number>) => {
			const tmpSelectedTypes = [...state.selectedTypes];
			const currentTypeIDx = tmpSelectedTypes.findIndex(({ id }) => id === action.payload);
			const currentType = { ...tmpSelectedTypes[currentTypeIDx] };
			currentType.isChecked = !currentType.isChecked;
			tmpSelectedTypes[currentTypeIDx] = currentType;

			state.selectedTypes = tmpSelectedTypes;
		},
		updatePokemon: (state, action: PayloadAction<IPokemon>) => {
			const pokeIDx = state.pokemons.findIndex(({ id }) => id === action.payload.id);
			if (pokeIDx === -1) return;

			state.pokemons[pokeIDx] = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPokedexPage.pending, (state) => {
			state.isFetching = true;
		})

		builder.addCase(fetchPokedexPage.fulfilled, (state, action) => {
			state.pageNumber += 1;
			state.pokemons = [...state.pokemons, ...action.payload];
			state.isFetching = false;
		})

		/* */

		builder.addCase(searchPokedex.pending, (state) => {
			state.isSearch = true;
			state.isFetching = true;
			state.pokemons = [];
		})

		builder.addCase(searchPokedex.fulfilled, (state, action) => {
			state.isFetching = false;
			state.pokemons = action.payload;
		})

		/* */

		builder.addCase(searchPokedexNextPage.pending, (state) => {
			state.isSearch = true;
			state.isFetching = true;
		})

		builder.addCase(searchPokedexNextPage.fulfilled, (state, action) => {
			state.isFetching = false;
			state.pokemons = [...state.pokemons, ...action.payload];
			state.pageNumber += 1;
		})

		/* */

		builder.addCase(clearPokedex.pending, (state) => {
			state.isSearch = false;
			state.isFetching = true;
			state.pokemons = [];
		})

		builder.addCase(clearPokedex.fulfilled, (state, action) => {
			state.isFetching = false;
			state.pokemons = action.payload;
			state.searchValue = '';
			state.selectedTypes = types;
		})
	}
})

export const { setPokemonsList, setSearchValue, setSelectedTypes, updatePokemon } = pokedexSlice.actions;

export default pokedexSlice.reducer;