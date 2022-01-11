import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import AuthGuard from './AuthGuard';
import AdminLayout from '../layouts/AdminLayout';
import ROUTES from '../constants/route';

const NotFoundPage = React.lazy(() => import('../pages/NotFoundPage'));
const AddAdminPage = React.lazy(() => import('../pages/AdminManage/AddAdminPage'));
const ViewAdminsPage = React.lazy(() => import('../pages/AdminManage/ViewAdminsPage'));
const ClassInforPage = React.lazy(() => import('../pages/ClassManage/ClassInforPage'));
const ViewClassesPage = React.lazy(() => import('../pages/ClassManage/ViewClassesPage'));
const ViewUsersPage = React.lazy(() => import('../pages/UserManage/ViewUsersPage'));
const UserInforPage = React.lazy(() => import('../pages/UserManage/UserInforPage'));

const AdminRoutes = () => {
	return (
		<Routes>
			<Route element={<AuthGuard role="admin" redirectTo={ROUTES.LOGIN} />}>
				<Route element={<AdminLayout />}>
					<Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.CLASS} />} />

					<Route path={ROUTES.ADMIN}>
						<Route index element={<Navigate to={ROUTES.ADMIN_VIEW_LIST} />} />
						<Route path={ROUTES.ADMIN_VIEW_LIST} element={<ViewAdminsPage />} />
						<Route path={ROUTES.ADMIN_ADD} element={<AddAdminPage />} />
					</Route>

					<Route path={ROUTES.USER}>
						<Route index element={<Navigate to={ROUTES.USER_VIEW_LIST} />} />
						<Route path={ROUTES.USER_VIEW_LIST} element={<ViewUsersPage />} />
						<Route path={ROUTES.USER_DETAIL} element={<UserInforPage />} />
					</Route>

					<Route path={ROUTES.CLASS}>
						<Route index element={<Navigate to={ROUTES.CLASS_VIEW_LIST} />} />
						<Route path={ROUTES.CLASS_VIEW_LIST} element={<ViewClassesPage />} />
						<Route path={ROUTES.CLASS_DETAIL} element={<ClassInforPage />} />
					</Route>

					<Route path={ROUTES.LOGIN} element={<Navigate to={ROUTES.ROOT} />} />
					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Route>
		</Routes>
	);
};

export default AdminRoutes;
