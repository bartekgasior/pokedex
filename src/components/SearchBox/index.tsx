import { Button, Grid, IconButton } from '@mui/material';
import React, { useMemo, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SearchFormStyles from './SearchForm.styles';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { clearPokedex, searchPokedex, setSearchValue, setSelectedTypes } from 'redux/pokedex/pokedexSlice';
import { useAppSelector } from 'hooks/useAppSelector';
import { Box } from '@mui/system';
import SearchListStyles from './SearchList.styles';

const SearchBox = () => {
  const dispatch = useAppDispatch();
  const isSearch = useAppSelector(state => state.pokedex.isSearch);
  const isFetching = useAppSelector(state => state.pokedex.isFetching);
  const searchValue = useAppSelector(state => state.pokedex.searchValue);
  const selectedTypes = useAppSelector(state => state.pokedex.selectedTypes);
  const [isListOpen, setIsListOpen] = useState(false);

  const isSearchDisabled = useMemo(
    () => searchValue === '' && selectedTypes.every(({ isChecked }) => !isChecked)
    , [selectedTypes, searchValue]
  )

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(searchPokedex())
  }

  const handleOnSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(e.target.value));
  }

  const handleClear = () => {
    dispatch(clearPokedex());
  }

  const toggleType = (typeID: number) => {
    dispatch(setSelectedTypes(typeID));
  }

  return (
    <>
      <SearchFormStyles onSubmit={e => handleSearch(e)}>
        <input value={searchValue} onChange={e => handleOnSearchChange(e)} placeholder={'Search by Pokemon name'} />
        <Button
          type='submit'
          variant='outlined'
          startIcon={<SearchIcon />}
          className='search-box-btn'
          disabled={isSearchDisabled}
        >
          Search
        </Button>
        {isSearch && !isFetching && <Button
          type='button'
          variant='outlined'
          startIcon={<ClearIcon />}
          className='search-box-btn'
          onClick={handleClear}
        >
          Clear
        </Button>}
      </SearchFormStyles>
      <Box textAlign='end'>
        <IconButton
          aria-label='toggle-search-list'
          size='small'
          onClick={() => setIsListOpen(prevIsListOpen => !prevIsListOpen)}
        >
          <KeyboardArrowDownIcon
            fontSize='large'
            sx={{ transform: isListOpen ? 'rotate(180deg)' : '', color: '#FFF' }}
          />
        </IconButton>

        <SearchListStyles container spacing={2} justifyContent='end' sx={{ maxHeight: isListOpen ? '250px' : 0 }}>
          {selectedTypes.map(type => <Grid item key={type.id}>
            <Button
              type='button'
              variant='outlined'
              startIcon={type.isChecked ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
              onClick={() => toggleType(type.id)}
            >
              {type.value}
            </Button>
          </Grid>)}
        </SearchListStyles>
      </Box>
    </>
  )
}

export default SearchBox