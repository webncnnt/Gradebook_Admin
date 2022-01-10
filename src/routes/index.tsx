import { BrowserRouter } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import AdminRoutes from './AdminRoutes';
import GuestRoutes from './GuestRoutes';

const AppRoutes = () => {
	const { revalidating } = useAuth();

	return revalidating ? null : (
		<BrowserRouter>
			<AdminRoutes />
			<GuestRoutes />
		</BrowserRouter>
	);
};

export default AppRoutes;
