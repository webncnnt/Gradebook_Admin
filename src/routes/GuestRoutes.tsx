import { Route, Routes } from 'react-router-dom';
import ROUTES from '../constants/route';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import AuthGuard from './AuthGuard';

const GuestRoutes = () => {
	return (
		<Routes>
			<Route element={<AuthGuard role="guest" />}>
				<Route path={ROUTES.ROOT} element={<LoginPage />} />
				<Route path={ROUTES.LOGIN} element={<LoginPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Routes>
	);
};

export default GuestRoutes;
