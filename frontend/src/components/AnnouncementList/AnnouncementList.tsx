import { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Alert,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  Button,
  InputAdornment,
  Chip,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '@store/index';
import {
  fetchAnnouncements,
  setFilters,
  clearFilters,
} from '@store/slices/announcementsSlice';
import AnnouncementCard from '../AnnouncementCard/AnnouncementCard';

const AnnouncementList = () => {
  const dispatch = useAppDispatch();
  const { announcements, loading, error, filters } = useAppSelector(
    (state) => state.announcements
  );

  const [page, setPage] = useState(1);
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    dispatch(fetchAnnouncements({ ...filters, page, limit: 20 }));
  }, [dispatch, filters, page]);

  const handleFilterChange = (key: string, value: string) => {
    setLocalFilters({ ...localFilters, [key]: value });
  };

  const handleApplyFilters = () => {
    dispatch(setFilters(localFilters));
    setPage(1);
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    setLocalFilters({ exchange: 'ALL' });
    setPage(1);
  };

  const hasActiveFilters = localFilters.exchange !== 'ALL' || 
    localFilters.search || 
    localFilters.dateFrom || 
    localFilters.dateTo;

  if (loading && announcements.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
        <CircularProgress sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ borderRadius: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <FilterIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Filters
          </Typography>
          {hasActiveFilters && (
            <Chip
              label="Active"
              size="small"
              sx={{
                height: 20,
                fontSize: '0.6875rem',
                backgroundColor: alpha('#6B8E7D', 0.1),
                color: 'primary.main',
              }}
            />
          )}
        </Box>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Exchange</InputLabel>
              <Select
                value={localFilters.exchange || 'ALL'}
                label="Exchange"
                onChange={(e) => handleFilterChange('exchange', e.target.value)}
                sx={{
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: alpha('#6B8E7D', 0.2),
                  },
                }}
              >
                <MenuItem value="ALL">All Exchanges</MenuItem>
                <MenuItem value="NSE">NSE</MenuItem>
                <MenuItem value="BSE">BSE</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TextField
              fullWidth
              size="small"
              value={localFilters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder="Search announcements..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <TextField
              fullWidth
              size="small"
              label="From Date"
              type="date"
              value={localFilters.dateFrom || ''}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <TextField
              fullWidth
              size="small"
              label="To Date"
              type="date"
              value={localFilters.dateTo || ''}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                onClick={handleApplyFilters}
                fullWidth
                sx={{ borderRadius: 2 }}
              >
                Apply
              </Button>
              <Button
                variant="outlined"
                onClick={handleClearFilters}
                sx={{
                  borderRadius: 2,
                  minWidth: 'auto',
                  px: 1.5,
                }}
              >
                <ClearIcon fontSize="small" />
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Showing <Box component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>{announcements.length}</Box> announcements
        </Typography>
      </Box>

      {announcements.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <SearchIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No announcements found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your filters or search criteria
          </Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={2}>
            {announcements.map((announcement) => (
              <Grid size={{ xs: 12, md: 6 }} key={announcement.id}>
                <AnnouncementCard announcement={announcement} />
              </Grid>
            ))}
          </Grid>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 4,
              pt: 3,
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Pagination
              count={10}
              page={page}
              onChange={(_, value) => setPage(value)}
              sx={{
                '& .MuiPaginationItem-root': {
                  borderRadius: 2,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  },
                },
              }}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default AnnouncementList;