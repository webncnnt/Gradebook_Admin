import { BrowserRouter } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import AuthRoutes from './AuthRoutes';
import GuestRoutes from './GuestRoutes';

const AppRoutes = () => {
	const { currentUser } = useAuth();

	return (
		<BrowserRouter>
			{currentUser ? <AuthRoutes /> : <GuestRoutes />}
		</BrowserRouter>
	);
};

export default AppRoutes;
