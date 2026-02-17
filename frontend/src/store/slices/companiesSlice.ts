import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Company } from '@types/announcement.types';
import api from '@services/api';

interface CompaniesState {
  companies: Company[];
  selectedCompany: Company | null;
  searchResults: Company[];
  loading: boolean;
  error: string | null;
}

const initialState: CompaniesState = {
  companies: [],
  selectedCompany: null,
  searchResults: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchCompanies = createAsyncThunk(
  'companies/fetchAll',
  async (exchange?: 'NSE' | 'BSE') => {
    const response = await api.get<Company[]>('/companies', {
      params: { exchange },
    });
    return response.data;
  }
);

export const searchCompanies = createAsyncThunk(
  'companies/search',
  async (query: string) => {
    const response = await api.get<Company[]>('/companies/search', {
      params: { q: query },
    });
    return response.data;
  }
);

export const fetchCompanyById = createAsyncThunk(
  'companies/fetchById',
  async (id: number) => {
    const response = await api.get<Company>(`/companies/${id}`);
    return response.data;
  }
);

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all companies
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch companies';
      })
      // Search companies
      .addCase(searchCompanies.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      })
      // Fetch by ID
      .addCase(fetchCompanyById.fulfilled, (state, action) => {
        state.selectedCompany = action.payload;
      });
  },
});

export const { clearSearchResults, clearError } = companiesSlice.actions;
export default companiesSlice.reducer;