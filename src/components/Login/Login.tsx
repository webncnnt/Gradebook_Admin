import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import LoginFormData from '../../types/form/LoginFormData';
import Button from '../Button';

type LoginFormProps = {
	formData?: LoginFormData;
	error?: boolean;
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

const Login = ({ onSubmit, formData, error = false }: LoginFormProps) => {
	const {
		register,
		handleSubmit,
		setFocus,
		formState: { errors }
	} = useForm<LoginFormData>({
		mode: 'onBlur',
		resolver: yupResolver(schema)
	});

	useEffect(() => {
		if (error) {
			setFocus('email');
		}
	}, [error]);

	const onFormSubmit = (data: LoginFormData) => {
		if (!onSubmit) return;
		if (errors.email || errors.password) return;

		onSubmit(data);
	};

	return (
		<form id="login-form" onSubmit={handleSubmit(onFormSubmit)}>
			<div className="flex flex-col gap-4 w-96">
				<TextField
					autoFocus
					{...register('email')}
					autoComplete="email"
					id="email_textbox"
					title="Email"
					defaultValue="ndmt1at21@gmail.com"
					label="Email"
					value={formData?.email}
					helperText={errors.email?.message}
					error={errors.email !== undefined}
				/>

				<TextField
					{...register('password')}
					autoComplete="current-password"
					type="password"
					id="password_textbox"
					title="Password"
					value={formData?.password}
					defaultValue="12345678"
					label="Password"
					error={errors.password !== undefined}
					helperText={errors.password?.message}
				/>

				<Button type="submit" className="mt-5">
					Login
				</Button>
			</div>
		</form>
	);
};

export default Login;
