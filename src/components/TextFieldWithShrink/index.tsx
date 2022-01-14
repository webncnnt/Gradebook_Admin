import { TextField, TextFieldProps } from '@mui/material';

const TextFieldWithShrink = ({ InputLabelProps, ...rest }: TextFieldProps) => {
	return <TextField InputLabelProps={{ shrink: true }} {...rest} />;
};

export default TextFieldWithShrink;
