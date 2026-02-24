import { useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  Switch,
  FormControlLabel,
  Alert as MuiAlert,
  Paper,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  NotificationsActive as AlertIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "@store/index";
import {
  fetchAlerts,
  createAlert,
  toggleAlert,
  deleteAlert,
} from "@store/slices/alertsSlice";
import AlertForm from "@components/AlertForm/AlertForm";
import { CreateAlertDto, Alert } from "@typings/alert.types";

const Alerts = () => {
  const dispatch = useAppDispatch();
  const { alerts, error } = useAppSelector((state) => state.alerts);
  const userId = 1;

  useEffect(() => {
    dispatch(fetchAlerts(userId));
  }, [dispatch]);

  const handleCreateAlert = async (alertData: CreateAlertDto) => {
    await dispatch(createAlert({ userId, alertData }));
  };

  const handleToggle = (id: number) => {
    dispatch(toggleAlert({ id, userId }));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteAlert({ id, userId }));
  };

  const activeAlerts = alerts.filter((a) => a.active);
  const inactiveAlerts = alerts.filter((a) => !a.active);

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          My Alerts
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your custom alerts for company announcements
        </Typography>
      </Box>

      {error && (
        <MuiAlert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </MuiAlert>
      )}

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: "1px solid",
              borderColor: "divider",
              position: { lg: "sticky" },
              top: { lg: 100 },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  backgroundColor: alpha("#6B8E7D", 0.1),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AddIcon sx={{ color: "primary.main" }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Create New Alert
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Set up custom notifications
                </Typography>
              </Box>
            </Box>
            <AlertForm onSubmit={handleCreateAlert} />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 8 }}>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <AlertIcon sx={{ color: "success.main", fontSize: 20 }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Active Alerts
              </Typography>
              <Chip
                label={activeAlerts.length}
                size="small"
                sx={{
                  backgroundColor: alpha("#4CAF7C", 0.1),
                  color: "#388E5C",
                  fontWeight: 600,
                  height: 24,
                }}
              />
            </Box>

            {activeAlerts.length === 0 ? (
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: "center",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <AlertIcon sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No active alerts
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Create your first alert to get started
                </Typography>
              </Paper>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {activeAlerts.map((alert) => (
                  <AlertCard
                    key={alert.id}
                    alert={alert}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                  />
                ))}
              </Box>
            )}
          </Box>

          {inactiveAlerts.length > 0 && (
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <AlertIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: "text.secondary" }}>
                  Inactive Alerts
                </Typography>
                <Chip
                  label={inactiveAlerts.length}
                  size="small"
                  sx={{
                    backgroundColor: alpha("#6B7B72", 0.1),
                    color: "#6B7B72",
                    fontWeight: 600,
                    height: 24,
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {inactiveAlerts.map((alert) => (
                  <AlertCard
                    key={alert.id}
                    alert={alert}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

interface AlertCardProps {
  alert: Alert;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const AlertCard = ({ alert, onToggle, onDelete }: AlertCardProps) => {
  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: alert.active ? alpha("#4CAF7C", 0.2) : "divider",
        backgroundColor: alert.active ? alpha("#4CAF7C", 0.02) : "background.paper",
        transition: "all 0.2s ease",
        "&:hover": {
          borderColor: alert.active ? alpha("#4CAF7C", 0.4) : alpha("#6B8E7D", 0.3),
          boxShadow: "0 4px 12px rgba(107, 142, 125, 0.1)",
        },
      }}
    >
      <CardContent sx={{ py: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", gap: 0.75, mb: 1.5, flexWrap: "wrap" }}>
              {alert.keywords.map((keyword: string) => (
                <Chip
                  key={keyword}
                  label={keyword}
                  size="small"
                  sx={{
                    backgroundColor: alpha("#6B8E7D", 0.1),
                    color: "#4A6B5A",
                    fontWeight: 500,
                    fontSize: "0.75rem",
                    height: 26,
                  }}
                />
              ))}
            </Box>

            {alert.company && (
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <Box component="span" sx={{ fontWeight: 600, fontFamily: '"JetBrains Mono", monospace' }}>
                  {alert.company.symbol}
                </Box>
                <Box component="span" color="text.secondary">
                  {" "}• {alert.company.name}
                </Box>
              </Typography>
            )}

            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Exchange: <Box component="span" sx={{ fontWeight: 500, color: "text.primary" }}>{alert.exchange || "BOTH"}</Box>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Via: <Box component="span" sx={{ fontWeight: 500, color: "text.primary" }}>{alert.notificationMethod}</Box>
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                mt: 1.5,
                pt: 1.5,
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  backgroundColor: alpha("#6B8E7D", 0.08),
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  color: "text.secondary",
                }}
              >
                Triggered {alert.triggeredCount} times
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={alert.active}
                  onChange={() => onToggle(alert.id)}
                />
              }
              label={
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 500,
                    color: alert.active ? "success.dark" : "text.secondary",
                  }}
                >
                  {alert.active ? "Active" : "Inactive"}
                </Typography>
              }
              sx={{ mr: 0 }}
            />
            <IconButton
              onClick={() => onDelete(alert.id)}
              size="small"
              sx={{
                color: "error.main",
                "&:hover": {
                  backgroundColor: alpha("#C75D5D", 0.1),
                },
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Alerts;