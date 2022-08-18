import { List, ListItem, ListItemText, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { typesColors } from 'components/PokemonCard/PokemonCard.styles'
import IPokemon from 'interfaces/Pokemon'
import React from 'react'

interface IProps {
  pokemon: IPokemon
}

const FightModalCard: React.FC<IProps> = ({ pokemon }) => {
  return (
    <Stack padding={1} border={'1px solid lightgrey'} sx={{ backgroundColor: typesColors[pokemon.types[0] ?? 'Colorless'] }}>
      <Typography variant='h6' component='label' textAlign='center'>
        {pokemon.name}
      </Typography>
      <Table sx={{ marginBlock: '.25rem' }}>
        <TableBody>
          <TableRow>
            <TableCell>
              hp
            </TableCell>
            <TableCell>
              {pokemon.hp}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              evolves from
            </TableCell>
            <TableCell>
              {pokemon.evolvesFrom || 'basic'}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              artist
            </TableCell>
            <TableCell>
              {pokemon.artist}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              abilities
            </TableCell>
            <TableCell>
              <List dense>
                {pokemon.abilities?.map(ability => {
                  return <ListItem key={ability.name}>
                    <ListItemText
                      primary={`${ability.type} - ${ability.name}`}
                    />
                  </ListItem>
                })}
              </List>
            </TableCell>
          </TableRow>

        </TableBody>
      </Table>
    </Stack >
  )
}

export default FightModalCard