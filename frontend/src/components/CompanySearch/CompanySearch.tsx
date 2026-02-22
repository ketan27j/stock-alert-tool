import { useState } from 'react';
import {
  Autocomplete,
  TextField,
  CircularProgress,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@store/index';
import { searchCompanies, clearSearchResults } from '@store/slices/companiesSlice';
import { Company } from '@typings/announcement.types';

interface CompanySearchProps {
  onSelect: (company: Company | null) => void;
  label?: string;
}

const CompanySearch = ({ onSelect, label = 'Search Company' }: CompanySearchProps) => {
  const dispatch = useAppDispatch();
  const { searchResults } = useAppSelector((state) => state.companies);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleSearch = async (query: string) => {
    if (query.length < 2) {
      dispatch(clearSearchResults());
      return;
    }

    setLoading(true);
    try {
      await dispatch(searchCompanies(query)).unwrap();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Autocomplete
      options={searchResults}
      getOptionLabel={(option) => `${option.symbol} - ${option.name}`}
      loading={loading}
      inputValue={inputValue}
      onInputChange={(_, newValue) => {
        setInputValue(newValue);
        handleSearch(newValue);
      }}
      onChange={(_, newValue) => {
        onSelect(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default CompanySearch;