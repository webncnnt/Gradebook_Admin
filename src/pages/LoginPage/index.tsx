import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FullScreenBackdrop from '../../components/FullScreenBackdrop';
import LoginForm from '../../components/LoginForm';
import useAlert from '../../hooks/useAlert';
import useAsync from '../../hooks/useAsync';
import useAuth from '../../hooks/useAuth';
import LoginFormData from '../../types/form/LoginFormData';

const LoginPage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { currentUser, login } = useAuth();
	const { addMessage } = useAlert();
	const { execute, status, error, pendingTime } = useAsync((data: LoginFormData) => login(data));

	// @ts-ignore
	const from = location.state?.from?.pathname;

	useEffect(() => {
		if (status !== 'error') return;
		if (error === null) return;

		addMessage(error.data.message, 'error');
	}, [status, error, addMessage]);

	useEffect(() => {
		if (status !== 'success') return;
		if (currentUser === null) return;

		navigate(from || '/', { replace: true });
	}, [status, currentUser, navigate, from]);

	const onSubmit = (data: LoginFormData) => {
		execute(data);
	};

	return (
		<div className="flex items-center justify-center w-screen h-screen">
			<div className="px-6 -mt-5 bg-white rounded-md shadow-lg py-14">
				<div className="mb-16 text-5xl font-black text-center font-logo ">Gradebook</div>
				<LoginForm error={status === 'error'} onSubmit={onSubmit} />
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
