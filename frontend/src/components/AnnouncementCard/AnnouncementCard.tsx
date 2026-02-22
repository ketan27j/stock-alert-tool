import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  IconButton,
  Link,
} from '@mui/material';
import {
  PictureAsPdf as PdfIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { Announcement } from '@typings/announcement.types';

interface AnnouncementCardProps {
  announcement: Announcement;
  onToggleImportant?: (id: number, isImportant: boolean) => void;
}

const AnnouncementCard = ({ announcement, onToggleImportant }: AnnouncementCardProps) => {
  return (
    <Card
      sx={{
        mb: 2,
        '&:hover': {
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
              <Chip
                label={announcement.exchange}
                color={announcement.exchange === 'NSE' ? 'primary' : 'secondary'}
                size="small"
              />
              <Chip
                label={announcement.company.symbol}
                variant="outlined"
                size="small"
              />
              {announcement.category && (
                <Chip
                  label={announcement.category}
                  variant="outlined"
                  size="small"
                  color="default"
                />
              )}
            </Box>

            <Typography variant="h6" gutterBottom>
              {announcement.title}
            </Typography>

            <Typography variant="body2" color="text.secondary" gutterBottom>
              {announcement.company.name}
            </Typography>

            {announcement.description && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {announcement.description.substring(0, 200)}
                {announcement.description.length > 200 ? '...' : ''}
              </Typography>
            )}

            <Box sx={{ display: 'flex', gap: 2, mt: 2, alignItems: 'center' }}>
              <Typography variant="caption" color="text.secondary">
                {format(new Date(announcement.announcementDate), 'MMM dd, yyyy')}
              </Typography>

              {announcement.pdfUrl && (
                <Link
                  href={announcement.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                >
                  <PdfIcon fontSize="small" />
                  <Typography variant="caption">View PDF</Typography>
                </Link>
              )}
            </Box>
          </Box>

          {onToggleImportant && (
            <IconButton
              onClick={() => onToggleImportant(announcement.id, !announcement.isImportant)}
              color={announcement.isImportant ? 'warning' : 'default'}
            >
              {announcement.isImportant ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default AnnouncementCard;