import { AppBar, InputBase, Tooltip, TooltipProps, Typography, tooltipClasses ,styled} from '@mui/material';

export const Headerstyle = styled(AppBar)(() => ({
  backgroundColor: 'white',
  height: '80px',
  display: 'flex',
  padding: '8px 0px',
  "&.MuiPaper-root ":{
    position:"relative",
  }
}));

export const Search = styled('div')(() => ({
  position: 'relative',
  width: '380px',
  marginLeft: 20,
  height: '46px',
  border: '1px solid',
  borderColor: 'rgba(221, 223, 227, 1)',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
}));

export const SearchIconWrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const StyledInputBase = styled(InputBase)(() => ({
  color: 'rgba(100, 107, 120, 1)',
  width: '100%',
}));

// export const StyledSearchIcon = styled(SearchIcon)(() => ({
//   width: '24px',
//   height: '24px',
// }));

export const EndIconContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
  marginRight: '8px',
  gap: '16px',
  '&:focus': {
    outline: 'none',
  },
  '& button:focus': {
    outline: 'none',
  },
}));

export const StyledTypography = styled(Typography)(() => ({
  fontWeight: 'bold',
  color: 'black',
  // margin: 1,
  fontSize: 20,
}));

export const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    // color: 'rgba(0, 0, 0, 0.87)',
    //boxShadow: "1px 0px 10px",
    //border: "1px solid #DDDFE3",
    padding: '0px',
    fontSize: 11,
    marginRight: '125px',
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.white,
    marginLeft: '46px',
    fontSize: '24px' ,
   },
}));

