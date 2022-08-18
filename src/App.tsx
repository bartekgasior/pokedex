import { Container, Fab } from "@mui/material";
import PokemonsGrid from "components/PokemonsGrid";
import { useEffect } from "react";
import { fetchPokedexPage, searchPokedexNextPage } from 'redux/pokedex/pokedexSlice';
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import FetchDataButton from "components/Buttons/FetchDataButton";
import NavigationIcon from '@mui/icons-material/Navigation';
import SearchBox from "components/SearchBox";
import PokemonModal from "components/Modals/PokemonModal";
import FightModal from "components/Modals/FightModal";

const App = () => {
  const dispatch = useAppDispatch()
  const isFetching = useAppSelector(state => state.pokedex.isFetching);
  const isSearch = useAppSelector(state => state.pokedex.isSearch);

  useEffect(() => {
    dispatch(fetchPokedexPage());
  }, [dispatch])

  return (
    <main className="App">
      <Container maxWidth='lg'>
        <SearchBox />
        <PokemonModal />
        <FightModal />
        <PokemonsGrid />

        <FetchDataButton
          isFetching={isFetching}
          onClick={() => isSearch ? dispatch(searchPokedexNextPage()) : dispatch(fetchPokedexPage())}
        />

        <Fab
          aria-label="scroll-to-top"
          size="small"
          sx={{ position: 'fixed', right: '0.25rem', bottom: '0.25rem' }}
          onClick={() => window.scrollTo(0, 0)}
        >
          <NavigationIcon />
        </Fab>
      </Container>
    </main>
  );
}

export default App;
