import { Dialog } from '@mui/material';
import { Stack } from '@mui/system';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import React, { useMemo } from 'react'
import { resetFight } from 'redux/pokemonFight/pokemonFightSlice';
import FightModalCard from './FightModalCard';

const FightModal = () => {
  const dispatch = useAppDispatch();
  const pokemon1ID = useAppSelector(state => state.fight.pokemon1ID);
  const pokemon2ID = useAppSelector(state => state.fight.pokemon2ID);
  const pokemons = useAppSelector(state => state.pokedex.pokemons);

  const isOpen = useMemo(() => {
    return pokemon1ID !== null && pokemon2ID !== null
  }, [pokemon1ID, pokemon2ID]);

  const pokemon1 = useMemo(() => {
    if (pokemon1ID === null) return null;

    return pokemons.find(poke => poke.id === pokemon1ID) ?? null;
  }, [pokemons, pokemon1ID]);

  const pokemon2 = useMemo(() => {
    if (pokemon2ID === null) return null;

    return pokemons.find(poke => poke.id === pokemon2ID) ?? null;
  }, [pokemons, pokemon2ID]);

  const handleClose = () => {
    dispatch(resetFight())
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <Stack direction={{ xs: 'column', md: 'row' }} sx={{ padding: '.5rem' }} spacing={2}>
        {pokemon1 && <FightModalCard pokemon={pokemon1} />}
        {pokemon2 && <FightModalCard pokemon={pokemon2} />}
      </Stack>
    </Dialog>
  )
}

export default FightModal