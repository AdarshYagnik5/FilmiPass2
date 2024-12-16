import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const StyledOutletBox = styled(Box)(() => ({
  marginTop: '16px',
  marginBottom: '40px',
}));

export const Container = styled(Box)(() => ({
  //display: 'grid',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  overflow:'hidden',
  margin: '0 auto',
}));