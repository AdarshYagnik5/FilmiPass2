import { Box, FormHelperText } from '@mui/material';
import { StyledOutlinedInput, StyledFormControl } from './TextField.styled';
import { FieldLabel } from '../FieldLabel';
import { CSSProperties } from 'react';

export interface TextFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  name?: string;
  label?: string;
  required?: boolean;
  value?: unknown;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMsg?: string;
  disabled?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  button?: React.ReactNode;
  type?: string;
  style?: CSSProperties | undefined;
  readOnly?: boolean;
  labelStyle?: CSSProperties | undefined;
  gap?: string;
  optionalText?: string;
  textAlign?: 'left' | 'center' | 'right';
  removeBorder?: boolean;
  className?: string;
  tabIndex?: number;
  height?: string;
  maxLength?: number;
}

export const TextField: React.FC<TextFieldProps> = (props: TextFieldProps) => {
  const {
    id,
    name,
    label,
    required,
    value,
    handleChange,
    error,
    errorMsg,
    disabled,
    startAdornment,
    endAdornment,
    placeholder,
    type,
    style,
    readOnly,
    optionalText,
    labelStyle,
    gap,
    textAlign, // Accept textAlign prop
    removeBorder,
    className,
    multiline,
    tabIndex,
    height,
    maxLength,
  } = props;

  const inputStyle: CSSProperties = textAlign ? { textAlign } : {}; // Conditionally apply text align style
  // const theme = useTheme();
  return (
    <StyledFormControl error={error} sx={{ height: height }}>
      <Box marginBottom={gap ? gap : ''}>
        {label ? (
          <FieldLabel
            id={`${id}Label`}
            optionalText={optionalText}
            label={label}
            required={required}
            style={labelStyle}
          />
        ) : (
          ''
        )}
      </Box>
      <StyledOutlinedInput
        sx={{
          background: disabled
            ? 'linear-gradient(0deg, #D3D3D3, #D3D3D3), linear-gradient(0deg, #D3D3D3, #D3D3D3)' // Example for disabled state (light gray)
            : '#FFFFFF',
          height: multiline ? '110px' : '30px', // Set height for multiline input
          '& fieldset': {
            border: removeBorder ? 'none' : '',
          },
          '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: style ? style.color : 'grey', // Font color for disabled state
            textAlign: 'right',
          },
        }}
        className={className}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        error={error}
        disabled={disabled}
        startAdornment={startAdornment}
        endAdornment={endAdornment}
        placeholder={placeholder}
        fullWidth
        type={type === 'password' ? 'password' : 'text'}
        style={style}
        readOnly={readOnly}
        multiline={multiline}
        rows={multiline ? 4 : 1}
        inputProps={{ style: inputStyle, tabIndex: tabIndex, maxLength: maxLength }} // Apply inputStyle to inputProps
      />
      <FormHelperText>{errorMsg ? errorMsg : ' '}</FormHelperText>
    </StyledFormControl>
  );
};
