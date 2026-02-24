import { useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Paper,
  Button,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Campaign as CampaignIcon,
  NotificationsActive as AlertsIcon,
  Today as TodayIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@store/index';
import { fetchLatestAnnouncements } from '@store/slices/announcementsSlice';
import AnnouncementCard from '@components/AnnouncementCard/AnnouncementCard';
import StatCard from '@components/Dashboard/StatCard';
import HeroSection from '@components/Dashboard/HeroSection';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { announcements, loading } = useAppSelector((state) => state.announcements);

  useEffect(() => {
    dispatch(fetchLatestAnnouncements(10));
  }, [dispatch]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  const stats = [
    {
      title: 'Total Announcements',
      value: announcements.length,
      icon: <CampaignIcon />,
      color: 'primary' as const,
    },
    {
      title: 'NSE Updates',
      value: announcements.filter((a) => a.exchange === 'NSE').length,
      icon: <TrendingUpIcon />,
      color: 'success' as const,
    },
    {
      title: 'BSE Updates',
      value: announcements.filter((a) => a.exchange === 'BSE').length,
      icon: <TrendingUpIcon />,
      color: 'warning' as const,
    },
    {
      title: 'Active Alerts',
      value: 0,
      icon: <AlertsIcon />,
      color: 'primary' as const,
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <HeroSection />

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid size={{ xs: 6, md: 3 }} key={index}>
              <StatCard
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                color={stat.color}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
              Latest Announcements
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Stay updated with the most recent company announcements
            </Typography>
          </Box>
          <Button
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/announcements')}
            sx={{ borderRadius: 2 }}
          >
            View All
          </Button>
        </Box>

        <Grid container spacing={2}>
          {announcements.slice(0, 6).map((announcement) => (
            <Grid size={{ xs: 12, md: 6 }} key={announcement.id}>
              <AnnouncementCard announcement={announcement} />
            </Grid>
          ))}
        </Grid>

        {announcements.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <CampaignIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No announcements yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Check back later for company announcements
            </Typography>
          </Box>
        )}
      </Paper>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: '100%',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <TodayIcon sx={{ color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Today's Highlights
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Key announcements and market updates for today
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {[
                { label: 'Board Meetings', count: 3 },
                { label: 'Dividend Announcements', count: 5 },
                { label: 'Results', count: 8 },
                { label: 'Corporate Actions', count: 2 },
              ].map((item) => (
                <Box
                  key={item.label}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: 'background.default',
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {item.label}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: 'primary.main',
                    }}
                  >
                    {item.count}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: '100%',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <AlertsIcon sx={{ color: 'warning.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Quick Actions
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Get started with these common actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/alerts')}
                sx={{
                  justifyContent: 'flex-start',
                  py: 1.5,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    borderColor: 'primary.main',
                  },
                }}
              >
                Create a new alert
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/companies')}
                sx={{
                  justifyContent: 'flex-start',
                  py: 1.5,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    borderColor: 'primary.main',
                  },
                }}
              >
                Browse companies
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/announcements')}
                sx={{
                  justifyContent: 'flex-start',
                  py: 1.5,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    borderColor: 'primary.main',
                  },
                }}
              >
                View all announcements
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;