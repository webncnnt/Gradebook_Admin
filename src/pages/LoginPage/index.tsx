import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FullScreenBackdrop from '../../components/FullScreenBackdrop';
import Login from '../../components/LoginForm/Login';
import useAlert from '../../hooks/useAlert';
import useAsync from '../../hooks/useAsync';
import useAuth from '../../hooks/useAuth';
import LoginFormData from '../../types/form/LoginFormData';

const LoginPage = () => {
	const navigate = useNavigate();
	const { currentUser, login } = useAuth();
	const { addMessage } = useAlert();
	const { execute, status, error, pendingTime } = useAsync((data: LoginFormData) => login(data));

	useEffect(() => {
		if (status !== 'error') return;
		if (error === null) return;

		addMessage(error.data.message, 'error');
	}, [status, error, addMessage]);

	useEffect(() => {
		if (status !== 'success') return;
		if (currentUser === null) return;

		navigate('/', { replace: true });
	}, [status, currentUser, navigate]);

	const onSubmit = (data: LoginFormData) => {
		execute(data);
	};

	return (
		<div className="flex items-center justify-center w-screen h-screen">
			<div className="-mt-5">
				<div className="mb-16 text-5xl font-black text-center font-logo ">Gradebook</div>
				<Login error={status === 'error'} onSubmit={onSubmit} />
			</div>

			{status === 'pending' && pendingTime >= 1 && (
				<FullScreenBackdrop className="flex items-center justify-center bg-gray-900 opacity-60">
					<CircularProgress />
				</FullScreenBackdrop>
			)}
		</div>
	);
};

export default LoginPage;
