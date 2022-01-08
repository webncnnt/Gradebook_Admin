import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
	const navigate = useNavigate();
	const { addMessage } = useAlert();
	const [formData, setFormData] = useState<LoginFormData>(INITIAL_LOGIN_DATA);
	const [submit, setSubmit] = useState(false);

	const { execute, status, value, error } = useAsync(
		async () => await authApi.postLogin(formData.email, formData.password)
	);

	useEffect(() => {
		if (submit) {
			execute();
			setSubmit(false);
		}
	}, [submit, execute]);

	useEffect(() => {
		if (status === 'error' && error !== null) {
			addMessage(error.message, 'error');
		}
	}, [status, error, addMessage]);

	useEffect(() => {
		if (status !== 'success') return;

		if (value === null) {
			addMessage('Login failed', 'error');
			return;
		}

		localStorage.setItem('access_token', value.data.token);
		navigate('/', { replace: true });
	}, [status, value, addMessage, navigate]);

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
