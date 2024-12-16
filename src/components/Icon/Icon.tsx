import { Box } from '@mui/material';
import { ReactSVG } from 'react-svg';

export interface SvgIconProps {
  src: string;
  id?: string;
  onClick?: () => void;
  className?: string;
  title?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

const Icon = ({ src, onClick, className, title, style, id, disabled }: SvgIconProps) => {
  return (
    <Box
      sx={{
        paddingTop: '0.7rem',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        '&:disabled': {
          cursor: 'not-allowed',
          opacity: '0.3',
          pointerEvents: 'none',
        },
      }}
      component={'button'}
      disabled={disabled}
    >
      <ReactSVG src={src} id={id} className={className} title={title} style={style} onClick={onClick} />
    </Box>
  );
};

export default Icon;
