import * as React from "react";
import Alert from "@mui/material/Alert";

export default function BasicAlerts({ children }) {
  return <Alert severity="error">{children}</Alert>;
}
