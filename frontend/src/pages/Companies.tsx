import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Paper,
} from '@mui/material';
import {
  Search as SearchIcon,
  Business as BusinessIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '@store/index';
import { fetchCompanies } from '@store/slices/companiesSlice';

const Companies = () => {
  const dispatch = useAppDispatch();
  const { companies } = useAppSelector((state) => state.companies);
  const [exchange, setExchange] = useState<'NSE' | 'BSE' | undefined>(undefined);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchCompanies(exchange));
  }, [dispatch, exchange]);

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase()) ||
    company.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const exchangeColors = {
    NSE: {
      bg: alpha('#6B8E7D', 0.1),
      color: '#4A6B5A',
    },
    BSE: {
      bg: alpha('#D4A853', 0.1),
      color: '#B08A3A',
    },
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Companies
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Browse and track companies listed on NSE and BSE
        </Typography>
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
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControl fullWidth>
              <InputLabel sx={{ fontWeight: 500 }}>Exchange</InputLabel>
              <Select
                value={exchange || ''}
                label="Exchange"
                onChange={(e) => setExchange(e.target.value as 'NSE' | 'BSE' | undefined || undefined)}
                sx={{
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: alpha('#6B8E7D', 0.2),
                  },
                }}
              >
                <MenuItem value="">All Exchanges</MenuItem>
                <MenuItem value="NSE">NSE</MenuItem>
                <MenuItem value="BSE">BSE</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 8 }}>
            <TextField
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by company name or symbol..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: alpha('#6B8E7D', 0.2),
                  },
                },
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Showing <Box component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>{filteredCompanies.length}</Box> companies
        </Typography>
        {exchange && (
          <Chip
            label={`Filtered by ${exchange}`}
            size="small"
            onDelete={() => setExchange(undefined)}
            sx={{
              backgroundColor: exchangeColors[exchange as 'NSE' | 'BSE']?.bg,
              color: exchangeColors[exchange as 'NSE' | 'BSE']?.color,
            }}
          />
        )}
      </Box>

      <Grid container spacing={3}>
        {filteredCompanies.map((company) => {
          const exchangeStyle = exchangeColors[company.exchange as 'NSE' | 'BSE'] || exchangeColors.NSE;
          
          return (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={company.id}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 32px rgba(107, 142, 125, 0.15)',
                    borderColor: alpha('#6B8E7D', 0.3),
                    '& .company-symbol': {
                      color: 'primary.main',
                    },
                    '& .trend-icon': {
                      opacity: 1,
                      transform: 'translateX(0)',
                    },
                  },
                }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2.5,
                        background: `linear-gradient(135deg, ${exchangeStyle.bg} 0%, ${alpha(exchangeStyle.color, 0.15)} 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <BusinessIcon sx={{ color: exchangeStyle.color, fontSize: 24 }} />
                    </Box>
                    <Chip
                      label={company.exchange}
                      size="small"
                      sx={{
                        backgroundColor: exchangeStyle.bg,
                        color: exchangeStyle.color,
                        fontWeight: 600,
                        fontSize: '0.6875rem',
                        height: 22,
                      }}
                    />
                  </Box>

                  <Typography
                    className="company-symbol"
                    variant="h6"
                    sx={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontWeight: 600,
                      mb: 0.5,
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {company.symbol}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      lineHeight: 1.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      minHeight: 36,
                    }}
                  >
                    {company.name}
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      pt: 1.5,
                      borderTop: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    {company.sector ? (
                      <Typography
                        variant="caption"
                        sx={{
                          backgroundColor: alpha('#6B8E7D', 0.06),
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          color: 'text.secondary',
                          fontSize: '0.6875rem',
                        }}
                      >
                        {company.sector}
                      </Typography>
                    ) : (
                      <Box />
                    )}
                    <TrendingUpIcon
                      className="trend-icon"
                      sx={{
                        fontSize: 18,
                        color: 'primary.main',
                        opacity: 0,
                        transform: 'translateX(-8px)',
                        transition: 'all 0.2s ease',
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {filteredCompanies.length === 0 && (
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: 'center',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <BusinessIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No companies found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filter criteria
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default Companies;