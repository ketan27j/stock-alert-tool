import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
  Notifications as NotificationsIcon,
  Business as BusinessIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              mr: 4,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            NSE/BSE Alerts
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
            <Button
              component={RouterLink}
              to="/"
              color="inherit"
              startIcon={<DashboardIcon />}
            >
              Dashboard
            </Button>
            <Button
              component={RouterLink}
              to="/announcements"
              color="inherit"
              startIcon={<NotificationsIcon />}
            >
              Announcements
            </Button>
            <Button
              component={RouterLink}
              to="/companies"
              color="inherit"
              startIcon={<BusinessIcon />}
            >
              Companies
            </Button>
            <Button
              component={RouterLink}
              to="/alerts"
              color="inherit"
              startIcon={<NotificationsIcon />}
            >
              My Alerts
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;