import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton, Badge, Avatar, Tooltip } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Notifications as NotificationsIcon,
  Business as BusinessIcon,
  Dashboard as DashboardIcon,
  Campaign as CampaignIcon,
} from '@mui/icons-material';
import { alpha } from '@mui/material/styles';

const navItems = [
  { label: 'Dashboard', path: '/', icon: <DashboardIcon /> },
  { label: 'Announcements', path: '/announcements', icon: <CampaignIcon /> },
  { label: 'Companies', path: '/companies', icon: <BusinessIcon /> },
  { label: 'My Alerts', path: '/alerts', icon: <NotificationsIcon /> },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 1 }}>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              textDecoration: 'none',
              mr: 4,
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #6B8E7D 0%, #4A6B5A 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(107, 142, 125, 0.3)',
              }}
            >
              <Typography sx={{ color: 'white', fontSize: 18, fontWeight: 700 }}>S</Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: '1.25rem',
                background: 'linear-gradient(135deg, #4A6B5A 0%, #6B8E7D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
              }}
            >
              StockPulse
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: 'flex', gap: 0.5 }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Button
                  key={item.path}
                  component={RouterLink}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    color: isActive ? 'primary.main' : 'text.secondary',
                    backgroundColor: isActive ? alpha('#6B8E7D', 0.1) : 'transparent',
                    fontWeight: isActive ? 600 : 500,
                    fontSize: '0.9375rem',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: alpha('#6B8E7D', 0.08),
                      color: 'primary.main',
                    },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Notifications">
              <IconButton
                sx={{
                  position: 'relative',
                  '&:hover': {
                    backgroundColor: alpha('#6B8E7D', 0.08),
                  },
                }}
              >
                <Badge
                  badgeContent={3}
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      fontSize: '0.65rem',
                      height: 18,
                      minWidth: 18,
                      fontWeight: 600,
                    },
                  }}
                >
                  <NotificationsIcon sx={{ color: 'text.secondary' }} />
                </Badge>
              </IconButton>
            </Tooltip>

            <Box
              sx={{
                width: 1,
                height: 24,
                backgroundColor: 'divider',
                mx: 1,
              }}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }}>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  backgroundColor: 'primary.main',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                K
              </Avatar>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;