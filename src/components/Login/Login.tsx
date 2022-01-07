import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import LoginFormData from '../../types/form/LoginFormData';
import Button from '../Button';

type LoginFormProps = {
	formData?: LoginFormData;
	passwordError?: string;
	emailError?: string;
	onSubmit?: (data: LoginFormData) => void;
};

const schema = Yup.object().shape({
	email: Yup.string()
		.required('Email is required')
		.matches(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Invalid email'
		),
	password: Yup.string()
		.required('Password is required')
		.min(6, 'Password must be at least 6 characters')
});

const Login = ({
	onSubmit,
	formData,
	passwordError,
	emailError
}: LoginFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<LoginFormData>({
		mode: 'onBlur',
		resolver: yupResolver(schema)
	});

	const onFormSubmit = (data: LoginFormData) => {
		if (!onSubmit) return;
		if (errors.email || errors.password) return;

		onSubmit(data);
	};

	return (
		<form id="login-form" onSubmit={handleSubmit(onFormSubmit)}>
			<div className="flex flex-col gap-4 w-96">
				<TextField
					{...register('email')}
					autoComplete="email"
					id="email_textbox"
					title="Email"
					label="Email"
					value={formData?.email}
					helperText={errors.email?.message || emailError}
					error={errors.email !== undefined || emailError !== undefined}
				/>

				<TextField
					{...register('password')}
					autoComplete="current-password"
					type="password"
					id="password_textbox"
					title="Password"
					value={formData?.password}
					label="Password"
					error={errors.password !== undefined || passwordError !== undefined}
					helperText={errors.password?.message || passwordError}
				/>

				<Button type="submit" className="mt-5">
					Login
				</Button>
			</div>
		</form>
	);
};

export default Login;
