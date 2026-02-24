import { Box, Typography, TextField, Button, InputAdornment, Container } from '@mui/material';
import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: 'linear-gradient(180deg, #FAF8F5 0%, #E8F0EB 100%)',
        pt: 6,
        pb: 8,
        mx: -3,
        px: 3,
        mb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              color: 'text.primary',
              mb: 2,
              letterSpacing: '-0.03em',
            }}
          >
            Stay Ahead of the{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #4A6B5A 0%, #6B8E7D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Market
            </Box>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              fontWeight: 400,
              maxWidth: 600,
              mx: 'auto',
              fontSize: '1.125rem',
              lineHeight: 1.6,
            }}
          >
            Track NSE/BSE company announcements in real-time. Never miss important updates that matter to your portfolio.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            maxWidth: 600,
            mx: 'auto',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <TextField
            fullWidth
            placeholder="Search companies or announcements..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white',
                borderRadius: 3,
                '& fieldset': {
                  borderColor: alpha('#6B8E7D', 0.2),
                },
                '&:hover fieldset': {
                  borderColor: alpha('#6B8E7D', 0.4),
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={() => navigate('/alerts')}
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: 3,
              whiteSpace: 'nowrap',
              fontWeight: 600,
            }}
          >
            Create Alert
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;