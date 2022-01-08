import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import AddAdminPage from '../pages/AddAdminPage';
import ClassManagePage from '../pages/ClassManagePage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import UserManagePage from '../pages/UserManagePage';
import ViewAdminPage from '../pages/ViewAdminsPage';

const AuthRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<AdminLayout />}>
				<Route path="/" element={<Navigate to={'/class'} />} />
				<Route path="/admin">
					<Route
						path="/admin"
						element={<Navigate to={'/admin/viewAdmins'} />}
					/>
					<Route path="/admin/viewAdmins" element={<ViewAdminPage />} />
					<Route path="/admin/addAdmin" element={<AddAdminPage />} />
				</Route>
				<Route path="/user" element={<UserManagePage />} />
				<Route path="/class" element={<ClassManagePage />} />
			</Route>
			<Route path="/login" element={<Navigate to={'/'} />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};

export default AuthRoutes;
