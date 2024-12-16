import { CSSProperties } from 'react';
import { StyledFormLabel, StyledOptionalText } from './FieldLabel.styled';

export interface FieldLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  label: string;
  required?: boolean;
  optionalText?: string;
  style?: CSSProperties | undefined;
}

export const FieldLabel: React.FC<FieldLabelProps> = (props: FieldLabelProps) => {
  const { id, label, required, optionalText, style } = props;
  return (
    <>
      <StyledFormLabel htmlFor={id} required={required} sx={style}>
        {label}{' '}
        {props?.optionalText !== '' ? <StyledOptionalText component={'span'}>{optionalText}</StyledOptionalText> : ''}
      </StyledFormLabel>
    </>
  );
};
