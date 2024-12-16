import { Box, Link, LinkProps, Typography, styled, Button, ButtonProps, TypographyProps } from '@mui/material';
//import Button from "../../components/Button";
//import { ButtonProps } from "../../components/Button/Button";

export const Container = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  overflow: 'hidden',
//   background: theme.palette.color19,
  margin: '0 auto',
}));

export const LoginContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '12px',
  width: '100%',
  height: '100%',
//   background: theme.palette.color1,
}));

export const LoginTitle = styled(Typography)(() => ({
//   color: theme.palette.color8,
  fontSize: '32px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: 'normal',
  marginTop: '5px',
  whiteSpace: 'nowrap',
}));

export const StyledBox = styled(Typography)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const StyledLink = styled(Link)<LinkProps>(
  () => `
    text-align: right;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`,
);

export const StyledTypographyRememberMe = styled(Typography)(
  () => `
    font-size: 14px;
    font-weight: 500;
    font-style: normal;
`,
);

export const StyledButtonLogin = styled(Button)<ButtonProps>(
  () => `
    display: flex;
    height: 52px;
    padding: 12px 16px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    align-self: stretch;
    border-radius: 8px;
    textTransform: none,
`,
);

export const StyledTypographyText = styled(Typography)(
  () => `
    display: flex;
    height: 22px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    align-self: stretch;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 160%;
`,
);

export const StyledTypographyAck = styled(Typography)<TypographyProps>(
  () => `
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`,
);
