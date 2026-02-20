import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Announcement, AnnouncementFilters } from '../../types/announcement.types';
import { fetchAnnouncementsApi, fetchLatestAnnouncementsApi } from '@services/announcementService';

interface AnnouncementsState {
  announcements: Announcement[];
  loading: boolean;
  error: string | null;
  filters: AnnouncementFilters & { page?: number; limit?: number };
}

const initialState: AnnouncementsState = {
  announcements: [],
  loading: false,
  error: null,
  filters: { exchange: 'ALL' },
};

export const fetchAnnouncements = createAsyncThunk(
  'announcements/fetchAll',
  async (params: AnnouncementFilters & { page?: number; limit?: number }) => {
    return await fetchAnnouncementsApi(params);
  }
);

export const fetchLatestAnnouncements = createAsyncThunk(
  'announcements/fetchLatest',
  async (limit: number) => {
    return await fetchLatestAnnouncementsApi(limit);
  }
);

const announcementsSlice = createSlice({
  name: 'announcements',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<AnnouncementFilters & { page?: number; limit?: number }>) => {
      state.filters = action.payload;
    },
    clearFilters: (state) => {
      state.filters = { exchange: 'ALL' };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnnouncements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.loading = false;
        state.announcements = action.payload;
      })
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch announcements';
      })
      .addCase(fetchLatestAnnouncements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestAnnouncements.fulfilled, (state, action) => {
        state.loading = false;
        state.announcements = action.payload;
      })
      .addCase(fetchLatestAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch announcements';
      });
  },
});

export const { setFilters, clearFilters } = announcementsSlice.actions;
export default announcementsSlice.reducer;
