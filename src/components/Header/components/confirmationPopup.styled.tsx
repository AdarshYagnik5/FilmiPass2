import { Dialog, styled } from '@mui/material';

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  height: '33vh',
  '& .MuiDialog-container': {
    '& .MuiPaper-root': {
      width: '100%',
      height: '170px',
      top: '70%',
      borderRadius: '18px', 
    },
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
  },
  '& .css-14x3umi-MuiTypography-root-MuiDialogTitle-root ': {
    color: '#000000',
    fontFamily: 'Poppins',
    fontSize: '20px',
    fontWeight: 700,
    textAlign: 'center',
  },
  '& .css-knqc4i-MuiDialogActions-root': {
    justifyContent: 'center',

  },
}));
