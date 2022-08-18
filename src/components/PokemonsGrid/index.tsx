import React from 'react'
import { Grid, Typography } from '@mui/material'
import { useAppSelector } from 'hooks/useAppSelector'
import PokemonCard from 'components/PokemonCard';

const PokemonsGrid = () => {
  const pokemons = useAppSelector(state => state.pokedex.pokemons);
  const isFetching = useAppSelector(state => state.pokedex.isFetching);

  if (pokemons.length === 0 && !isFetching) {
    return <Typography variant='h4' color={'red'}>Data not found</Typography>
  }

  return (
    <Grid container>
      {pokemons.map((pokemon, idx) => <Grid
        key={pokemon.id}
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        padding={1}
      >
        <PokemonCard
          idx={idx}
          id={pokemon.id}
          types={pokemon.types}
          name={pokemon.name}
          images={pokemon.images}
          hp={pokemon.hp}
          weaknesses={pokemon.weaknesses}
        />
      </Grid>
      )}

    </Grid>
  )
}

export default PokemonsGrid