import { configureStore } from '@reduxjs/toolkit';
import announcementsReducer from './slices/announcementsSlice';
import alertsReducer from './slices/alertsSlice';
import companiesReducer from './slices/companiesSlice';

const store = configureStore({
  reducer: {
    announcements: announcementsReducer,
    alerts: alertsReducer,
    companies: companiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
