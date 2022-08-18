import React, { useEffect, useMemo, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import { DialogTitle, IconButton, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { closeModal } from 'redux/pokemonModal/pokemonModalSlice';
import IPokemon from 'interfaces/Pokemon';
import { Container, Stack } from '@mui/system';
import { updatePokemon } from 'redux/pokedex/pokedexSlice';

const PokemonModal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(state => state.modal.isOpen);
  const pokemonID = useAppSelector(state => state.modal.pokemonID);
  const pokemons = useAppSelector(state => state.pokedex.pokemons);
  const [poke, setPoke] = useState<null | IPokemon>(null)

  useEffect(() => {

    if (!pokemonID) return;
    const foundPoke = pokemons.find(pokemon => pokemon.id === pokemonID);
    setPoke(foundPoke ?? null);

  }, [pokemons, pokemonID])

  const startingPokemon = useMemo(() => {
    if (!pokemonID) return;
    return pokemons.find(pokemon => pokemon.id === pokemonID);
  }, [pokemons, pokemonID])

  const hasPokeChanged = useMemo(() => {
    if (!poke || !startingPokemon) return false;

    if (poke.hp !== startingPokemon.hp) return true;
    if (poke.name !== startingPokemon.name) return true;
    if (poke.artist !== startingPokemon.artist) return true;

    return false;
  }, [poke, startingPokemon]);

  const handleClose = () => {
    dispatch(closeModal());
  }

  const onNumberInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = +e.target.value;
    if (value < 0) return;
    setPoke(prevPoke => prevPoke === null ? null : ({ ...prevPoke, [e.target.name]: `${value}` }));
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setPoke(prevPoke => prevPoke === null ? null : ({ ...prevPoke, [e.target.name]: value }));
  }

  const onSave = () => {
    if (!poke) return;
    dispatch(updatePokemon(poke));
  }

  if (!poke) return null;

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{poke.name}</DialogTitle>
      <IconButton
        aria-label='save-poke'
        size='small'
        sx={{ position: 'absolute', right: 0, top: 0, color: hasPokeChanged ? 'red' : null }}
        disabled={!hasPokeChanged}
        onClick={onSave}
      >
        <SaveIcon />
      </IconButton>
      <Container sx={{ marginBottom: '.5rem' }}>
        <img
          src={poke.images?.small}
          alt={poke.id}
          loading="lazy"
        />
        <Stack
          sx={{ border: '1px solid #000' }}
          padding={0.5}
        >
          <TextField
            id="modal-poke-hp"
            label="hp"
            variant="standard"
            value={poke.hp}
            onChange={(e) => onNumberInputChange(e)}
            type='number'
            name='hp'
          />

          <TextField
            id="modal-poke-name"
            label="name"
            variant="standard"
            value={poke.name}
            onChange={(e) => onInputChange(e)}
            type='text'
            name='name'
          />

          <TextField
            id="modal-poke-artist"
            label="artist"
            variant="standard"
            value={poke.artist}
            onChange={(e) => onInputChange(e)}
            type='text'
            name='artist'
          />

        </Stack>
      </Container>
    </Dialog>
  )
}

export default PokemonModal