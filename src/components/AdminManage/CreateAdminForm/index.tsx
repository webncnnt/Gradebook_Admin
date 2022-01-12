import { TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import RegisterAdminFormData from '../../../types/form/RegisterAdminFormData';
import { HTMLAttributes } from 'react';

type CreateAdminFormProps = {
	onSubmit?: (data: RegisterAdminFormData) => void;
} & Omit<HTMLAttributes<HTMLDivElement>, 'onSubmit'>;

const schema = Yup.object().shape({
	fullname: Yup.string()
		.required('Full name is required')
		.min(5, 'Full name must be at least 5 characters long'),
	email: Yup.string()
		.required('Email is required')
		.matches(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Invalid email'
		),
	password: Yup.string()
		.required('Password is required')
		.min(6, 'Password must be at least 6 characters'),
	passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const INITIAL_ADMIN_FORM_DATA = {
	fullname: '',
	email: '',
	password: '',
	passwordConfirmation: ''
} as RegisterAdminFormData;

const CreateAdminForm = ({ onSubmit, ...rest }: CreateAdminFormProps) => {
	const {
		register,
		handleSubmit,
		setFocus,
		reset,
		clearErrors,
		formState: { errors }
	} = useForm<RegisterAdminFormData>({
		defaultValues: INITIAL_ADMIN_FORM_DATA,
		mode: 'onBlur',
		resolver: yupResolver(schema)
	});

	const handleRegisterFormSubmit = (formData: RegisterAdminFormData) => {
		if (Object.keys(errors).length !== 0) return;
		if (!onSubmit) return;

		onSubmit(formData);
	};

	const handleResetForm = () => {
		reset(INITIAL_ADMIN_FORM_DATA);
		clearErrors(['email', 'fullname', 'password', 'passwordConfirmation']);
		setFocus('fullname');
	};

	return (
		<div {...rest}>
			<form
				className="flex flex-col gap-4 lg:w-2/3"
				onSubmit={handleSubmit(handleRegisterFormSubmit)}
			>
				<TextField
					size="small"
					{...register('fullname')}
					autoFocus
					label="Full Name (*)"
					helperText={errors.fullname?.message}
					error={errors.fullname !== undefined}
					InputLabelProps={{
						shrink: true
					}}
				/>
				<TextField
					size="small"
					{...register('email')}
					label="Email (*)"
					helperText={errors.email?.message}
					error={errors.email !== undefined}
					InputLabelProps={{
						shrink: true
					}}
				/>
				<TextField
					size="small"
					{...register('password')}
					type="password"
					label="Password (*)"
					helperText={errors.password?.message}
					error={errors.password !== undefined}
					InputLabelProps={{
						shrink: true
					}}
				/>
				<TextField
					size="small"
					{...register('passwordConfirmation')}
					type="password"
					label="Confirm Password (*)"
					helperText={errors.passwordConfirmation?.message}
					error={errors.passwordConfirmation !== undefined}
					InputLabelProps={{
						shrink: true
					}}
				/>

				<div className="flex flex-row gap-1 mt-3">
					<button
						type="submit"
						className="px-5 py-2 text-white transition-all bg-blue-500 rounded-md hover:bg-blue-600"
					>
						Add
					</button>
					<button
						className="px-5 py-2 text-white transition-all bg-gray-500 rounded-md hover:bg-gray-600"
						onClick={handleResetForm}
					>
						Reset
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateAdminForm;
