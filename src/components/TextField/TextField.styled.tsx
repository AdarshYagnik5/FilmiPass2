import { OutlinedInput, OutlinedInputProps, styled, FormControl, FormControlProps } from '@mui/material';

export const StyledOutlinedInput = styled(OutlinedInput)<OutlinedInputProps>(({ endAdornment, id, theme, style }) => ({
  height: '30px',
  borderRadius: '8px',
  border: '1px',
  gap: '2px',
  background: theme.palette.color1,
  '& .MuiOutlinedInput-input': {
    fontSize: '14px',
    fontWeight: theme.typography.fontWeightRegular,
    lineHeight: '22.4px',
    height: '1px',
    letterSpacing: '0em',
    textAlign: id === 'targetCollateralValue' || id === 'payerConcentrationLimit' ? 'right' : endAdornment ? 'right' : 'left',
    marginTop: endAdornment ? '3px' : '',
    color: theme.palette.color2,
  },
  '& .Mui-disabled': {
    padding: '12px',
    borderRadius: '8px',
    height: '1px',
    color: theme.palette.color11,
    fontWeight: style ? style.fontWeight : theme.typography.fontWeightRegular,
    backgroundColor: theme.palette.color24,
  },

  '& .MuiInputBase-input::placeholder': {
    fontSize: theme.typography.font14,
    fontWeight: theme.typography.fontWeightRegular,
    lineHeight: '22px',
    letterSpacing: '0em',
    left: 0,
    textAlign: 'left',
    color: theme.palette.color5,
  },
}));

export const StyledFormControl = styled(FormControl)<FormControlProps>(() => ({
  width: '100%',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
}));
