// import { Button as MUIButton } from "@mui/material";
import { Theme, SxProps, Typography, Box } from '@mui/material';
import StyledButton from './Button.styled';

export interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    id?: string;
    text: string;
    disabled?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    onClick?: () => void;
    fullWidth?: boolean;
    size?: 'small' | 'medium' | 'large';
    variant?: 'primary' | 'secondary' | 'disabled' | 'ghost' ;
    type?: 'submit' | 'reset';
    css?: SxProps<Theme> | undefined;
    textCss?: SxProps<Theme> | undefined;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    const { id, text, disabled, startIcon, endIcon, size, variant, onClick, fullWidth, type, css, textCss } = props;
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };
    return (
        <StyledButton
            sx={css}
            id={id}
            disabled={disabled}
            fullWidth={fullWidth}
            startIcon={startIcon}
            endIcon={endIcon}
            size={size}
            type={type}
            variant={variant}
            onClick={handleClick}
        >
            {disabled && <Box sx={{marginTop:'-8px' , marginRight:'6px'}}>
            <Box>
                Filmi pass
              </Box>
                </Box>}
            <Typography sx={textCss}>
                {text}
            </Typography>
        </StyledButton>
    );
};

export default Button;
