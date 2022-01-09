import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import AuthGuard from './AuthGuard';

const GuestRoutes = () => {
	return (
		<Routes>
			<Route element={<AuthGuard role="guest" />}>
				<Route path="/" element={<LoginPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Routes>
	);
};

export default GuestRoutes;
