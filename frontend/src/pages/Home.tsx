import { useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@store/index';
import { fetchLatestAnnouncements } from '@store/slices/announcementsSlice';
import AnnouncementCard from '@components/AnnouncementCard/AnnouncementCard';

const Home = () => {
  const dispatch = useAppDispatch();
  const { announcements, loading } = useAppSelector((state) => state.announcements);

  useEffect(() => {
    dispatch(fetchLatestAnnouncements(10));
  }, [dispatch]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Announcements
              </Typography>
              <Typography variant="h4">
                {announcements.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                NSE Announcements
              </Typography>
              <Typography variant="h4">
                {announcements.filter((a) => a.exchange === 'NSE').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                BSE Announcements
              </Typography>
              <Typography variant="h4">
                {announcements.filter((a) => a.exchange === 'BSE').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Active Alerts
              </Typography>
              <Typography variant="h4">0</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Latest Announcements
      </Typography>

      {announcements.map((announcement) => (
        <AnnouncementCard key={announcement.id} announcement={announcement} />
      ))}
    </Box>
  );
};

export default Home;