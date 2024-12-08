import { TextField } from '@mui/material';
import { ChangeEvent, Dispatch, SetStateAction, useContext } from 'react';
import { searchContext } from '../contexts/SearchContext.tsx';
import useDebounce from '../hooks/useDebounce.ts';
import { useNavigate } from 'react-router-dom';

const handleSearch = (
  e: ChangeEvent<HTMLInputElement>,
  setSearch: Dispatch<SetStateAction<string>>
) => {
  e.preventDefault();
  setSearch(e.target.value);
};

const SearchBar = () => {
  const { setSearch } = useContext(searchContext);
  const navigate = useNavigate();

  // debounce our search so that we don't make too many api calls
  const debouncedSearch = useDebounce(
    (e) => handleSearch(e as ChangeEvent<HTMLInputElement>, setSearch),
    500
  );
  // we will keep this as an uncontrolled component due as the debounce function does not allow it to update in a timely manner and this will avoid setting an unnecessary state
  return (
    <form className="m-auto">
      <TextField
        name="search"
        placeholder="Search for Issues here"
        variant="outlined"
        type="search"
        size="small"
        className="rounded-md min-w-24"
        onChange={debouncedSearch}
        onFocus={() => navigate('/search')}
        sx={{
          backgroundColor: 'white',
          width: '33%',
          maxWidth: '48rem',
          minWidth: {
            xs: '90vw',
            sm: '24rem',
          },
          zIndex: 1,
        }}
      />
    </form>
  );
};

export default SearchBar;
