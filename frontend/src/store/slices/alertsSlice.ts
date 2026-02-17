import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Alert, CreateAlertDto } from '@types/alert.types';
import api from '@services/api';

interface AlertsState {
  alerts: Alert[];
  loading: boolean;
  error: string | null;
}

const initialState: AlertsState = {
  alerts: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchAlerts = createAsyncThunk(
  'alerts/fetchAll',
  async (userId: number) => {
    const response = await api.get<Alert[]>(`/alerts/user/${userId}`);
    return response.data;
  }
);

export const createAlert = createAsyncThunk(
  'alerts/create',
  async ({ userId, alertData }: { userId: number; alertData: CreateAlertDto }) => {
    const response = await api.post<Alert>('/alerts', {
      userId,
      ...alertData,
    });
    return response.data;
  }
);

export const toggleAlert = createAsyncThunk(
  'alerts/toggle',
  async ({ id, userId }: { id: number; userId: number }) => {
    const response = await api.patch<Alert>(`/alerts/${id}/toggle`, { userId });
    return response.data;
  }
);

export const deleteAlert = createAsyncThunk(
  'alerts/delete',
  async ({ id, userId }: { id: number; userId: number }) => {
    await api.delete(`/alerts/${id}`, { data: { userId } });
    return id;
  }
);

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch alerts
      .addCase(fetchAlerts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlerts.fulfilled, (state, action) => {
        state.loading = false;
        state.alerts = action.payload;
      })
      .addCase(fetchAlerts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch alerts';
      })
      // Create alert
      .addCase(createAlert.fulfilled, (state, action) => {
        state.alerts.unshift(action.payload);
      })
      // Toggle alert
      .addCase(toggleAlert.fulfilled, (state, action) => {
        const index = state.alerts.findIndex(a => a.id === action.payload.id);
        if (index !== -1) {
          state.alerts[index] = action.payload;
        }
      })
      // Delete alert
      .addCase(deleteAlert.fulfilled, (state, action) => {
        state.alerts = state.alerts.filter(a => a.id !== action.payload);
      });
  },
});

export const { clearError } = alertsSlice.actions;
export default alertsSlice.reducer;