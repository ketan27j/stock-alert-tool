import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Company = { id: string; name: string };

const initialState: Company[] = [];

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    setCompanies: (state, action: PayloadAction<Company[]>) => action.payload,
    addCompany: (state, action: PayloadAction<Company>) => {
      state.push(action.payload);
    },
  },
});

export const { setCompanies, addCompany } = companiesSlice.actions;
export default companiesSlice.reducer;
