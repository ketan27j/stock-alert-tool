import { Box, Typography, Card, CardContent } from '@mui/material';
import { ReactNode } from 'react';
import { alpha } from '@mui/material/styles';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'primary' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'large';
}

const colorMap = {
  primary: {
    bg: alpha('#6B8E7D', 0.1),
    iconBg: alpha('#6B8E7D', 0.15),
    iconColor: '#4A6B5A',
  },
  success: {
    bg: alpha('#4CAF7C', 0.1),
    iconBg: alpha('#4CAF7C', 0.15),
    iconColor: '#388E5C',
  },
  warning: {
    bg: alpha('#D4A853', 0.1),
    iconBg: alpha('#D4A853', 0.15),
    iconColor: '#B08A3A',
  },
  error: {
    bg: alpha('#C75D5D', 0.1),
    iconBg: alpha('#C75D5D', 0.15),
    iconColor: '#A33D3D',
  },
};

const StatCard = ({ title, value, icon, trend, color = 'primary', size = 'medium' }: StatCardProps) => {
  const colors = colorMap[color];

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        background: `linear-gradient(135deg, ${colors.bg} 0%, ${alpha(colors.iconBg, 0.3)} 100%)`,
        border: '1px solid',
        borderColor: alpha(colors.iconColor, 0.15),
        '&:hover': {
          borderColor: alpha(colors.iconColor, 0.3),
        },
      }}
    >
      <CardContent sx={{ p: size === 'large' ? 3 : 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontWeight: 500,
                mb: 0.5,
                fontSize: size === 'large' ? '0.9375rem' : '0.875rem',
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                fontSize: size === 'large' ? '2.5rem' : size === 'small' ? '1.5rem' : '2rem',
                lineHeight: 1.2,
              }}
            >
              {value}
            </Typography>
            {trend && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 20,
                    height: 20,
                    borderRadius: 1,
                    backgroundColor: trend.isPositive ? alpha('#4CAF7C', 0.15) : alpha('#C75D5D', 0.15),
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '0.75rem',
                      color: trend.isPositive ? '#388E5C' : '#A33D3D',
                      fontWeight: 600,
                    }}
                  >
                    {trend.isPositive ? '↑' : '↓'}
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: trend.isPositive ? 'success.dark' : 'error.dark',
                    fontWeight: 500,
                  }}
                >
                  {trend.value}% from last week
                </Typography>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              width: size === 'large' ? 56 : size === 'small' ? 36 : 48,
              height: size === 'large' ? 56 : size === 'small' ? 36 : 48,
              borderRadius: 2.5,
              backgroundColor: colors.iconBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.iconColor,
              '& svg': {
                fontSize: size === 'large' ? '1.75rem' : size === 'small' ? '1.25rem' : '1.5rem',
              },
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;