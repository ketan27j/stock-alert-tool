import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Typography,
} from '@mui/material';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { Company } from '@typings/announcement.types';
import { CreateAlertDto } from '@typings/alert.types';
import CompanySearch from '../CompanySearch/CompanySearch';

interface AlertFormProps {
  onSubmit: (alertData: CreateAlertDto) => void;
}

const AlertForm = ({ onSubmit }: AlertFormProps) => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [notificationMethod, setNotificationMethod] = useState<'email' | 'sms' | 'push'>('email');
  const [exchange, setExchange] = useState<'NSE' | 'BSE' | 'BOTH'>('BOTH');

  const handleAddKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const alertData: CreateAlertDto = {
      companyId: selectedCompany?.id,
      keywords,
      notificationMethod,
      exchange,
    };

    onSubmit(alertData);

    setSelectedCompany(null);
    setKeywords([]);
    setKeywordInput('');
    setNotificationMethod('email');
    setExchange('BOTH');
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 600,
            color: 'text.secondary',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            mb: 1,
            display: 'block',
          }}
        >
          Company (Optional)
        </Typography>
        <CompanySearch
          onSelect={setSelectedCompany}
          label="Select Company"
        />
        {selectedCompany && (
          <Box
            sx={{
              mt: 1,
              p: 1.5,
              borderRadius: 2,
              backgroundColor: alpha('#6B8E7D', 0.06),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontWeight: 600,
                }}
              >
                {selectedCompany.symbol}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {selectedCompany.name}
              </Typography>
            </Box>
            <Button
              size="small"
              onClick={() => setSelectedCompany(null)}
              sx={{ minWidth: 'auto', p: 0.5 }}
            >
              <CloseIcon fontSize="small" />
            </Button>
          </Box>
        )}
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 600,
            color: 'text.secondary',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            mb: 1,
            display: 'block',
          }}
        >
          Keywords *
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
          <TextField
            fullWidth
            size="small"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddKeyword();
              }
            }}
            placeholder="e.g., dividend, bonus, merger"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
          <Button
            variant="outlined"
            onClick={handleAddKeyword}
            disabled={!keywordInput.trim()}
            sx={{
              borderRadius: 2,
              px: 2,
              minWidth: 'auto',
            }}
          >
            <AddIcon />
          </Button>
        </Box>

        {keywords.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
            {keywords.map((keyword) => (
              <Chip
                key={keyword}
                label={keyword}
                onDelete={() => handleRemoveKeyword(keyword)}
                sx={{
                  backgroundColor: alpha('#6B8E7D', 0.1),
                  color: '#4A6B5A',
                  fontWeight: 500,
                  '& .MuiChip-deleteIcon': {
                    color: '#6B8E7D',
                    '&:hover': {
                      color: '#4A6B5A',
                    },
                  },
                }}
              />
            ))}
          </Box>
        )}

        {keywords.length === 0 && (
          <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            Add at least one keyword to create an alert
          </Typography>
        )}
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControl fullWidth size="small">
          <InputLabel sx={{ fontWeight: 500 }}>Exchange</InputLabel>
          <Select
            value={exchange}
            label="Exchange"
            onChange={(e) => setExchange(e.target.value as 'NSE' | 'BSE' | 'BOTH')}
            sx={{
              borderRadius: 2,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: alpha('#6B8E7D', 0.2),
              },
            }}
          >
            <MenuItem value="BOTH">Both (NSE & BSE)</MenuItem>
            <MenuItem value="NSE">NSE Only</MenuItem>
            <MenuItem value="BSE">BSE Only</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel sx={{ fontWeight: 500 }}>Notify Via</InputLabel>
          <Select
            value={notificationMethod}
            label="Notify Via"
            onChange={(e) => setNotificationMethod(e.target.value as 'email' | 'sms' | 'push')}
            sx={{
              borderRadius: 2,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: alpha('#6B8E7D', 0.2),
              },
            }}
          >
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="sms">SMS</MenuItem>
            <MenuItem value="push">Push Notification</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        disabled={keywords.length === 0}
        sx={{
          py: 1.5,
          borderRadius: 2,
          fontWeight: 600,
          fontSize: '0.9375rem',
        }}
      >
        Create Alert
      </Button>
    </Box>
  );
};

export default AlertForm;