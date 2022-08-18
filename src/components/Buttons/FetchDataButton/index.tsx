import { Box, Button, CircularProgress } from '@mui/material';
import React from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useAppSelector } from 'hooks/useAppSelector';

interface IProps {
    isFetching: boolean;
    onClick: () => void;
}

const FetchDataButton: React.FC<IProps> = ({
    isFetching,
    onClick
}) => {
    const pokemons = useAppSelector(state => state.pokedex.pokemons);

    return (
        <Box textAlign={'center'} marginY={'.5rem'}>
            {isFetching
                ? <CircularProgress data-testid='spinner' />
                : pokemons.length > 0 && <Button variant="contained" onClick={onClick}>
                    <AddCircleOutlineIcon />
                </Button>}
        </Box>
    )
}

export default FetchDataButton