import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import AddAdminPage from '../pages/AdminManage/AddAdminPage';
import ClassInforPage from '../pages/ClassManage/ClassInforPage';
import ClassManagePage from '../pages/ClassManage/ViewClassesPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import ViewUsersPage from '../pages/UserManage/ViewUsersPage';
import ViewAdminsPage from '../pages/AdminManage/ViewAdminsPage';
import AuthGuard from './AuthGuard';

const AdminRoutes = () => {
	return (
		<Routes>
			<Route element={<AuthGuard role="admin" redirectTo="/login" />}>
				<Route element={<AdminLayout />}>
					<Route path="/" element={<Navigate to="/user" />} />

					<Route path="/admin">
						<Route path="/admin" element={<ViewAdminsPage />} />
						<Route path="/admin/viewAdmins" element={<ViewAdminsPage />} />
						<Route path="/admin/addAdmin" element={<AddAdminPage />} />
					</Route>

					<Route path="/user">
						<Route path="/user" element={<ViewUsersPage />} />
						<Route path="/user/viewUsers" element={<ViewUsersPage />} />
					</Route>

					<Route path="/class">
						<Route
							path="/class"
							element={<Navigate to="/class/viewClasses" />}
						/>
						<Route path="/class/viewClasses" element={<ClassManagePage />} />
						<Route path="/class/:classId" element={<ClassInforPage />} />
					</Route>

					<Route path="/login" element={<Navigate to="/" />} />
					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Route>
		</Routes>
	);
};

export default AdminRoutes;
