import { Typography, Box, Paper } from '@mui/material';
import AnnouncementList from '@components/AnnouncementList/AnnouncementList';

const Announcements = () => {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Announcements
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Browse all company announcements from NSE and BSE
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <AnnouncementList />
      </Paper>
    </Box>
  );
};

export default Announcements;