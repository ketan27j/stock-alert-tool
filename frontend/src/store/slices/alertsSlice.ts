import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Alert = { id: string; companyId: string; threshold: number };

const initialState: Alert[] = [];

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    setAlerts: (state, action: PayloadAction<Alert[]>) => action.payload,
    addAlert: (state, action: PayloadAction<Alert>) => {
      state.push(action.payload);
    },
  },
});

export const { setAlerts, addAlert } = alertsSlice.actions;
export default alertsSlice.reducer;
