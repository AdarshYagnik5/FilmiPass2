import { FormLabel, FormLabelProps, styled } from '@mui/material';

export const StyledFormLabel = styled(FormLabel)<FormLabelProps>(({ theme }) => ({
  fontSize: theme.typography.font14,
  lineHeight: '22px',
  letterSpacing: '0em',
  textAlign: 'left',
  color: theme.palette.color2,
  fontWeight: theme.typography.fontWeightRegular,
  '& .MuiFormLabel-asterisk': {
    color: 'red',
    marginLeft: '-4px',
  },
}));

export const StyledOptionalText = styled(FormLabel)<FormLabelProps>(({ theme }) => ({
  color: theme.palette.color11,
  wordWrap: 'break-word',
  fontSize: theme.typography.font14,
  lineHeight: '22px',
  letterSpacing: '0em',
}));
