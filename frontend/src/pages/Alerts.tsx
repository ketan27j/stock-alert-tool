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
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@store/index";
import {
  fetchAlerts,
  createAlert,
  toggleAlert,
  deleteAlert,
} from "@store/slices/alertsSlice";
import AlertForm from "@components/AlertForm/AlertForm";
import { CreateAlertDto } from "../types/alert.types";

const Alerts = () => {
  const dispatch = useAppDispatch();
  const { alerts, loading, error } = useAppSelector((state) => state.alerts);

  // Hardcoded for demo - in real app, get from auth context
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

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Alerts
      </Typography>

      {error && (
        <MuiAlert severity="error" sx={{ mb: 2 }}>
          {error}
        </MuiAlert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <AlertForm onSubmit={handleCreateAlert} />
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom>
            Active Alerts ({alerts.filter((a) => a.active).length})
          </Typography>

          {alerts.length === 0 ? (
            <Typography color="text.secondary">
              No alerts created yet. Create your first alert!
            </Typography>
          ) : (
            alerts.map((alert) => (
              <Card key={alert.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}>
                        {JSON.parse(alert.keywords).map((keyword: string) => (
                          <Chip key={keyword} label={keyword} size="small" color="primary" />
                        ))}
                      </Box>

                      {alert.company && (
                        <Typography variant="body2" color="text.secondary">
                          Company: {alert.company.symbol} - {alert.company.name}
                        </Typography>
                      )}

                      <Typography variant="body2" color="text.secondary">
                        Exchange: {alert.exchange || "BOTH"} | Method: {alert.notificationMethod}
                      </Typography>

                      <Typography variant="caption" color="text.secondary">
                        Triggered: {alert.triggeredCount} times
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={alert.active}
                            onChange={() => handleToggle(alert.id)}
                          />
                        }
                        label={alert.active ? "Active" : "Inactive"}
                      />
                      <IconButton
                        onClick={() => handleDelete(alert.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Alerts;