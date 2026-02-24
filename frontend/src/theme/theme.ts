import { createTheme, alpha } from '@mui/material/styles';

const sageGreen = {
  main: '#6B8E7D',
  dark: '#4A6B5A',
  light: '#8BA898',
  contrastText: '#FFFFFF',
};

const forestGreen = {
  main: '#2D5A4A',
  dark: '#1A3D32',
  light: '#4A7A68',
};


export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: sageGreen.main,
      dark: sageGreen.dark,
      light: sageGreen.light,
      contrastText: sageGreen.contrastText,
    },
    secondary: {
      main: forestGreen.main,
      dark: forestGreen.dark,
      light: forestGreen.light,
    },
    background: {
      default: '#FAF8F5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A2E23',
      secondary: '#6B7B72',
    },
    success: {
      main: '#4CAF7C',
      light: '#7CC9A0',
      dark: '#388E5C',
    },
    warning: {
      main: '#D4A853',
      light: '#E5C07B',
      dark: '#B08A3A',
    },
    error: {
      main: '#C75D5D',
      light: '#D98A8A',
      dark: '#A33D3D',
    },
    divider: alpha('#6B8E7D', 0.12),
  },
  typography: {
    fontFamily: '"Inter", "system-ui", -apple-system, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      color: '#1A2E23',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      color: '#1A2E23',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.4,
      color: '#1A2E23',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      color: '#1A2E23',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.5,
      color: '#1A2E23',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#1A2E23',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#1A2E23',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: '#6B7B72',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
      color: '#6B7B72',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 8px rgba(107, 142, 125, 0.08)',
    '0px 4px 16px rgba(107, 142, 125, 0.1)',
    '0px 8px 24px rgba(107, 142, 125, 0.12)',
    '0px 12px 32px rgba(107, 142, 125, 0.14)',
    '0px 16px 40px rgba(107, 142, 125, 0.16)',
    '0px 20px 48px rgba(107, 142, 125, 0.18)',
    '0px 24px 56px rgba(107, 142, 125, 0.2)',
    '0px 28px 64px rgba(107, 142, 125, 0.22)',
    '0px 32px 72px rgba(107, 142, 125, 0.24)',
    '0px 36px 80px rgba(107, 142, 125, 0.26)',
    '0px 40px 88px rgba(107, 142, 125, 0.28)',
    '0px 44px 96px rgba(107, 142, 125, 0.3)',
    '0px 48px 104px rgba(107, 142, 125, 0.32)',
    '0px 52px 112px rgba(107, 142, 125, 0.34)',
    '0px 56px 120px rgba(107, 142, 125, 0.36)',
    '0px 60px 128px rgba(107, 142, 125, 0.38)',
    '0px 64px 136px rgba(107, 142, 125, 0.4)',
    '0px 68px 144px rgba(107, 142, 125, 0.42)',
    '0px 72px 152px rgba(107, 142, 125, 0.44)',
    '0px 76px 160px rgba(107, 142, 125, 0.46)',
    '0px 80px 168px rgba(107, 142, 125, 0.48)',
    '0px 84px 176px rgba(107, 142, 125, 0.5)',
    '0px 88px 184px rgba(107, 142, 125, 0.52)',
    '0px 92px 192px rgba(107, 142, 125, 0.54)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#FAF8F5',
          scrollbarColor: '#6B8E7D40 transparent',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: 8,
            height: 8,
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: alpha('#6B8E7D', 0.3),
            '&:hover': {
              backgroundColor: alpha('#6B8E7D', 0.5),
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 20px',
          fontSize: '0.9375rem',
          transition: 'all 0.2s ease-in-out',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(107, 142, 125, 0.3)',
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          borderWidth: 1.5,
          '&:hover': {
            borderWidth: 1.5,
            backgroundColor: alpha('#6B8E7D', 0.04),
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: `1px solid ${alpha('#6B8E7D', 0.1)}`,
          boxShadow: '0px 2px 8px rgba(107, 142, 125, 0.06)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0px 8px 24px rgba(107, 142, 125, 0.15)',
            transform: 'translateY(-2px)',
            borderColor: alpha('#6B8E7D', 0.25),
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
        colorPrimary: {
          backgroundColor: alpha('#6B8E7D', 0.15),
          color: '#4A6B5A',
        },
        colorSecondary: {
          backgroundColor: alpha('#2D5A4A', 0.12),
          color: '#2D5A4A',
        },
        outlined: {
          borderColor: alpha('#6B8E7D', 0.3),
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              boxShadow: '0px 2px 8px rgba(107, 142, 125, 0.1)',
            },
            '&.Mui-focused': {
              boxShadow: '0px 4px 12px rgba(107, 142, 125, 0.15)',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0px 2px 8px rgba(107, 142, 125, 0.08)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#1A2E23',
          boxShadow: '0px 1px 0px rgba(107, 142, 125, 0.1)',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: alpha('#6B8E7D', 0.08),
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 44,
          height: 24,
          padding: 0,
        },
        switchBase: {
          padding: 2,
          '&.Mui-checked': {
            transform: 'translateX(20px)',
            '& + .MuiSwitch-track': {
              backgroundColor: '#6B8E7D',
              opacity: 1,
            },
          },
        },
        thumb: {
          width: 20,
          height: 20,
          boxShadow: 'none',
        },
        track: {
          borderRadius: 12,
          backgroundColor: '#E0E0E0',
          opacity: 1,
        },
      },
    },
  },
});

export default theme;