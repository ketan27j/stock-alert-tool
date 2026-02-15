import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Announcement = { id: string; title: string };

const initialState: Announcement[] = [];

const announcementsSlice = createSlice({
  name: 'announcements',
  initialState,
  reducers: {
    setAnnouncements: (state, action: PayloadAction<Announcement[]>) => action.payload,
    addAnnouncement: (state, action: PayloadAction<Announcement>) => {
      state.push(action.payload);
    },
  },
});

export const { setAnnouncements, addAnnouncement } = announcementsSlice.actions;
export default announcementsSlice.reducer;
