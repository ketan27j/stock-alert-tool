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
} from '@mui/material';
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

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Companies
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <FormControl fullWidth>
            <InputLabel>Exchange</InputLabel>
            <Select
              value={exchange || ''}
              label="Exchange"
              onChange={(e) => setExchange(e.target.value as 'NSE' | 'BSE' | undefined)}
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
            label="Search Companies"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or symbol..."
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {filteredCompanies.map((company) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={company.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h6">{company.symbol}</Typography>
                  <Chip
                    label={company.exchange}
                    color={company.exchange === 'NSE' ? 'primary' : 'secondary'}
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {company.name}
                </Typography>
                {company.sector && (
                  <Typography variant="caption" color="text.secondary">
                    Sector: {company.sector}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredCompanies.length === 0 && (
        <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
          No companies found
        </Typography>
      )}
    </Box>
  );
};

export default Companies;