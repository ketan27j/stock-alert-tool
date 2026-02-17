import { Typography, Box } from '@mui/material';
import AnnouncementList from '@components/AnnouncementList/AnnouncementList';

const Announcements = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        All Announcements
      </Typography>
      <AnnouncementList />
    </Box>
  );
};

export default Announcements;