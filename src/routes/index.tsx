import { BrowserRouter } from 'react-router-dom';
import AdminRoutes from './AdminRoutes';
import GuestRoutes from './GuestRoutes';

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<AdminRoutes />
			<GuestRoutes />
		</BrowserRouter>
	);
};

export default AppRoutes;
