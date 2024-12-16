import { Alert, Button, IconButton, Typography, styled } from '@mui/material';

export const StyledAlert = styled(Alert)(() => ({
  padding: '8px 16px 0px 10px',
  // backgroundColor: 'red',
  borderRadius: '8px',
  fontSize: '16px',
  boxShadow: '0px 12px 64px 0px rgba(20, 13, 13, 0.30)',
  //height: 'auto',
  width: '697px',
  display: 'flex',
  alignItems: 'flex-start',
  alignText: 'center',
  borderLeft: '6px solid',
  '& .MuiAlert-icon': {
    paddingTop: '0px',
  },
}));
export const StyledButton = styled(Button)(() => ({
  width: '82px',
  //height: '68px',
  marginLeft: '7px',
  marginRight: '7px',
  backgroundColor: 'red',
  color: 'blue',
  fontWeight: 700,
  border: 0,
  fontSize: '16px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  textTransform: 'revert',
}));
export const StyledIconButton = styled(IconButton)(() => ({
  display: 'flex',
  alignItems: 'center',
  //height: '68px',
  padding: '0px',
  bottom: '2px',
  borderRadius: 0,
}));
const createStyledMessage = (marginTop: string) =>
  styled(Typography)(({ theme }) => ({
    color: theme.palette.color2,
    fontSize: '14px',
    margin: 0,
    marginTop,
  }));
export const StyledMessage = createStyledMessage('0px');
export const StyledMessage1 = createStyledMessage('10px');

export const StyledName = styled(Typography)(({ theme }) => ({
  color: theme.palette.color2,
  fontWeight: theme.typography.fontWeight700,
  fontSize: '14px',
  margin: 0,
}));
