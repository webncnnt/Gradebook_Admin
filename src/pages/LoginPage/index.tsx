import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import FullScreenBackdrop from '../../components/FullScreenBackdrop';
import Login from '../../components/Login/Login';
import useAlert from '../../hooks/useAlert';
import useAsync from '../../hooks/useAsync';
import authApi from '../../services/apis/authApi';
import LoginFormData from '../../types/form/LoginFormData';

const INITIAL_LOGIN_DATA = {
	email: '',
	password: ''
};

const LoginPage = () => {
	const { addMessage } = useAlert();
	const [formData, setFormData] = useState<LoginFormData>(INITIAL_LOGIN_DATA);
	const [submit, setSubmit] = useState(false);

	const { execute, status, value, error } = useAsync(
		() => authApi.postLogin(formData.email, formData.password),
		[formData]
	);

	useEffect(() => {
		submit === true && execute();
	}, [submit, formData]);

	useEffect(() => {
		if (status === 'error' && error !== null) {
			addMessage(error.message, 'error');
		}
	}, [status]);

	const onSubmit = (data: LoginFormData) => {
		setFormData(data);
		setSubmit(true);
	};

	return (
		<div className="flex items-center justify-center w-screen h-screen">
			<div className="-mt-5">
				<div className="mb-16 text-5xl font-black text-center font-logo ">
					Gradebook
				</div>
				<Login onSubmit={onSubmit} />
			</div>

			{status === 'pending' && (
				<FullScreenBackdrop className="flex items-center justify-center bg-gray-900 opacity-60">
					<CircularProgress />
				</FullScreenBackdrop>
			)}
		</div>
	);
};

export default LoginPage;
