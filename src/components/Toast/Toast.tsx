import React from 'react';
import { Box, Snackbar, Alert } from '@mui/material';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  open: boolean;
  type: 'error' | 'success' | 'warning';
  title?: string;
  message?: string;
  name?: string;
  Id?: number;
  autoHide?: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  open,
  type,
  title,
  message,
  name,
  Id,
  onClose,
}: ToastProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      style={{ marginTop: '72px' }}
    >
      <Alert
        severity={type} 
        onClose={onClose}
        action={
          <Box
            onClick={onClose}
            sx={{ cursor: 'pointer', fontWeight: 'bold', padding: '0 8px' }}
          >
            X
          </Box>
        }
        sx={{ width: '100%' }}
      >
        <Box fontWeight="bold">{title}</Box>
        <Box>{message}</Box>
        {name && Id != null && <Box>{`${name} - ${Id}`}</Box>}
      </Alert>
    </Snackbar>
  );
};
