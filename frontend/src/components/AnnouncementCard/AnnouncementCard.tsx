import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  IconButton,
  Link,
  Button,
} from '@mui/material';
import {
  PictureAsPdf as PdfIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Notifications as BellIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { alpha } from '@mui/material/styles';
import { Announcement } from '@typings/announcement.types';

interface AnnouncementCardProps {
  announcement: Announcement;
  onToggleImportant?: (id: number, isImportant: boolean) => void;
}

const AnnouncementCard = ({ announcement, onToggleImportant }: AnnouncementCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const exchangeColors = {
    NSE: {
      bg: alpha('#6B8E7D', 0.12),
      color: '#4A6B5A',
      border: alpha('#6B8E7D', 0.3),
    },
    BSE: {
      bg: alpha('#D4A853', 0.12),
      color: '#B08A3A',
      border: alpha('#D4A853', 0.3),
    },
  };

  const exchangeStyle = exchangeColors[announcement.exchange as 'NSE' | 'BSE'] || exchangeColors.NSE;

  return (
    <Card
      elevation={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid',
        borderColor: isHovered ? alpha('#6B8E7D', 0.3) : 'divider',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 24px rgba(107, 142, 125, 0.15)',
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${exchangeStyle.color} 0%, ${alpha(exchangeStyle.color, 0.5)} 100%)`,
        }}
      />
      
      <CardContent sx={{ pt: 2.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
            <Chip
              label={announcement.exchange}
              size="small"
              sx={{
                backgroundColor: exchangeStyle.bg,
                color: exchangeStyle.color,
                fontWeight: 600,
                fontSize: '0.6875rem',
                height: 22,
              }}
            />
            <Typography
              variant="body2"
              sx={{
                fontFamily: '"JetBrains Mono", monospace',
                fontWeight: 600,
                color: 'text.primary',
                fontSize: '0.875rem',
              }}
            >
              {announcement.company.symbol}
            </Typography>
          </Box>
          
          {onToggleImportant && (
            <IconButton
              size="small"
              onClick={() => onToggleImportant(announcement.id, !announcement.isImportant)}
              sx={{
                padding: 0.5,
                '&:hover': {
                  backgroundColor: alpha('#D4A853', 0.1),
                },
              }}
            >
              {announcement.isImportant ? (
                <StarIcon sx={{ fontSize: 20, color: 'warning.main' }} />
              ) : (
                <StarBorderIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
              )}
            </IconButton>
          )}
        </Box>

        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            mb: 0.5,
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {announcement.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1.5,
            fontSize: '0.8125rem',
          }}
        >
          {announcement.company.name}
        </Typography>

        {announcement.category && (
          <Chip
            label={announcement.category}
            size="small"
            variant="outlined"
            sx={{
              height: 20,
              fontSize: '0.6875rem',
              mb: 1.5,
              borderColor: alpha('#6B8E7D', 0.2),
              color: 'text.secondary',
            }}
          />
        )}

        {announcement.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: '0.8125rem',
              lineHeight: 1.6,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mb: 2,
            }}
          >
            {announcement.description}
          </Typography>
        )}

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
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontSize: '0.75rem',
            }}
          >
            {format(new Date(announcement.announcementDate), 'MMM dd, yyyy')}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            {announcement.pdfUrl && (
              <Link
                href={announcement.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: 'primary.main',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  '&:hover': {
                    color: 'primary.dark',
                  },
                }}
              >
                <PdfIcon sx={{ fontSize: 16 }} />
                PDF
              </Link>
            )}
          </Box>
        </Box>

        {isHovered && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              animation: 'fadeIn 0.2s ease',
              '@keyframes fadeIn': {
                from: { opacity: 0, transform: 'translateY(4px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            <Button
              size="small"
              variant="contained"
              startIcon={<BellIcon sx={{ fontSize: 16 }} />}
              sx={{
                py: 0.5,
                px: 1.5,
                fontSize: '0.75rem',
                borderRadius: 1.5,
                boxShadow: '0 2px 8px rgba(107, 142, 125, 0.3)',
              }}
            >
              Set Alert
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default AnnouncementCard;