import { TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import RegisterAdminFormData from '../../../types/form/RegisterAdminFormData';

type CreateAdminFormProps = {
	onSubmit?: (data: RegisterAdminFormData) => void;
};

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

const CreateAdminForm = ({ onSubmit }: CreateAdminFormProps) => {
	const {
		register,
		handleSubmit,
		setFocus,
		reset,
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
		setFocus('fullname');
	};

	return (
		<div>
			<form
				className="flex flex-col gap-4 lg:w-2/3"
				onSubmit={handleSubmit(handleRegisterFormSubmit)}
			>
				<TextField
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
					{...register('email')}
					label="Email (*)"
					helperText={errors.email?.message}
					error={errors.email !== undefined}
					InputLabelProps={{
						shrink: true
					}}
				/>
				<TextField
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
						className="py-3 text-white transition-all bg-blue-500 rounded-md px-7 hover:bg-blue-600"
					>
						Add
					</button>
					<button
						className="py-3 text-white transition-all bg-gray-500 rounded-md px-7 hover:bg-gray-600"
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
