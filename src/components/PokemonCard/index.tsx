import { Button, IconButton, Typography } from '@mui/material';
import ICardImage from 'interfaces/CardImage';
import { TPokemonType } from 'interfaces/PokemonType';
import React, { useState } from 'react'
import PokemonCardStyles, { typesColors } from './PokemonCard.styles'
import PillTypeLabel from 'components/Labels/PillTypeLabel';
import IPokemonWeakness from 'interfaces/PokemonWeakness';
import { Stack } from '@mui/system';
import { UnfoldLess, UnfoldMore } from '@mui/icons-material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { openModal } from 'redux/pokemonModal/pokemonModalSlice';
import { useAppSelector } from 'hooks/useAppSelector';
import { resetPokemon1, resetPokemon2, setPokemon } from 'redux/pokemonFight/pokemonFightSlice';

interface IProps {
  idx: number;
  id: string;
  name: string;
  types?: TPokemonType[];
  images?: ICardImage;
  hp?: string;
  weaknesses?: IPokemonWeakness[];
}

const PokemonCard: React.FC<IProps> = ({
  idx,
  id,
  name,
  types = [],
  images,
  hp,
  weaknesses
}) => {
  const dispatch = useAppDispatch();
  const pokemon1ID = useAppSelector(state => state.fight.pokemon1ID);
  const pokemon2ID = useAppSelector(state => state.fight.pokemon2ID);
  const [isOpen, setIsOpen] = useState(false);

  const togglePokemonModal = (pokeID: string) => {
    dispatch(openModal(pokeID));
  }

  const setPokeToFight = () => {
    if (pokemon1ID === id) {
      dispatch(resetPokemon1());
      return;
    }

    if (pokemon2ID === id) {
      dispatch(resetPokemon2());
      return;
    }

    if (pokemon1ID === null) {
      dispatch(setPokemon(id));
      return;
    }

    dispatch(setPokemon(id));
  }

  return (
    <PokemonCardStyles
      variant="outlined"
      type={types[0] ?? "Colorless"}
    >
      <span className='pokemon-idx'>#{idx}</span>

      <Button
        variant="outlined"
        className={`pokemon-fight-btn ${pokemon1ID === id || pokemon2ID === id ? 'poke-selected-to-fight' : ''} `}
        onClick={setPokeToFight}
      >
        Fight
      </Button>
      <img
        src={images?.small}
        alt={id}
        loading="lazy"
      />

      <IconButton
        aria-label='resize'
        size='small'
        onClick={() => setIsOpen(prevIsOpen => !prevIsOpen)}
        className='resize-pokemon-card'
        data-testid='resize-btn'
      >
        {isOpen
          ? <UnfoldLess fontSize='small' />
          : <UnfoldMore fontSize='small' />
        }
      </IconButton>

      <Stack direction="row">
        <Typography variant="h6" textAlign="center" fontWeight="bold" lineHeight='1rem' marginTop={'.5rem'}>
          {name}
        </Typography>

        <IconButton
          aria-label='open-modal'
          size='small'
          sx={{ marginLeft: 'auto' }}
          onClick={() => togglePokemonModal(id)}
        >
          <OpenInNewIcon />
        </IconButton>
      </Stack>

      <section className={`pokemon-details ${isOpen ? 'pokemon-details-opened' : ''}`} data-testid='pokemon-card-details'>
        <div className='pokemon-details-types'>
          {types.map(type => <PillTypeLabel key={type} type={type} bgColor={typesColors[type]} />)}
        </div>
        <table>
          <tbody>
            <tr>
              <td>id:</td>
              <td>{id}</td>
            </tr>

            {hp && <tr>
              <td>hp:</td>
              <td>{hp}</td>
            </tr>}

            {weaknesses && <tr>
              <td>weaknesses:</td>
              <td>
                <Stack spacing={0.25}>
                  {weaknesses.map((weakness) => <span key={weakness.type}>
                    {weakness.type}
                  </span>)}
                </Stack>
              </td>
            </tr>}

          </tbody>
        </table>

      </section>

    </PokemonCardStyles>
  )
}

export default PokemonCard