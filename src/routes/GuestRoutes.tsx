import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

const GuestRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/login" />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};

export default GuestRoutes;
