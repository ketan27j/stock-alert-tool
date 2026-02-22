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
  Paper,
  Typography,
} from '@mui/material';
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

    // Reset form
    setSelectedCompany(null);
    setKeywords([]);
    setKeywordInput('');
    setNotificationMethod('email');
    setExchange('BOTH');
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Create New Alert
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Box sx={{ mb: 3 }}>
          <CompanySearch
            onSelect={setSelectedCompany}
            label="Select Company (Optional)"
          />
          {selectedCompany && (
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Selected: {selectedCompany.symbol} - {selectedCompany.name}
            </Typography>
          )}
        </Box>

        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <TextField
              fullWidth
              label="Add Keywords"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddKeyword();
                }
              }}
              placeholder="e.g., dividend, bonus, merger"
            />
            <Button variant="outlined" onClick={handleAddKeyword}>
              Add
            </Button>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {keywords.map((keyword) => (
              <Chip
                key={keyword}
                label={keyword}
                onDelete={() => handleRemoveKeyword(keyword)}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
        </Box>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Exchange</InputLabel>
          <Select
            value={exchange}
            label="Exchange"
            onChange={(e) => setExchange(e.target.value as 'NSE' | 'BSE' | 'BOTH')}
          >
            <MenuItem value="BOTH">Both (NSE & BSE)</MenuItem>
            <MenuItem value="NSE">NSE Only</MenuItem>
            <MenuItem value="BSE">BSE Only</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Notification Method</InputLabel>
          <Select
            value={notificationMethod}
            label="Notification Method"
            onChange={(e) => setNotificationMethod(e.target.value as 'email' | 'sms' | 'push')}
          >
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="sms">SMS</MenuItem>
            <MenuItem value="push">Push Notification</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={keywords.length === 0}
        >
          Create Alert
        </Button>
      </Box>
    </Paper>
  );
};

export default AlertForm;