import {
	faAdd,
	faGraduationCap,
	faList,
	faScrewdriverWrench,
	faSignOut,
	faUsers
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Skeleton } from '@mui/material';
import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import SidebarItem from '../components/Sidebar/type';
import ROUTES from '../constants/route';
import useAuth from '../hooks/useAuth';

const items: SidebarItem[] = [
	{
		name: 'Class',
		icon: faGraduationCap,
		activePaths: [ROUTES.CLASS_DETAIL],
		items: [
			{
				path: ROUTES.CLASS_VIEW_LIST,
				name: 'View Classes',
				icon: faList
			}
		]
	},
	{
		name: 'User',
		icon: faUsers,
		activePaths: [ROUTES.USER_DETAIL],
		items: [
			{
				path: ROUTES.USER_VIEW_LIST,
				name: 'View Users',
				icon: faList
			}
		]
	},
	{
		name: 'Admin',
		icon: faScrewdriverWrench,
		items: [
			{
				path: ROUTES.ADMIN_VIEW_LIST,
				name: 'View Admins',
				icon: faList
			},
			{
				path: ROUTES.ADMIN_ADD,
				name: 'Add Admin',
				icon: faAdd
			}
		]
	}
];

const FallbackSkeleton = () => {
	return (
		<div className="flex flex-col gap-5">
			<Skeleton variant="text" height={70} />
			<Skeleton variant="rectangular" height={300} />
		</div>
	);
};

const AdminLayout = () => {
	const { logout } = useAuth();

	const handleLogout = () => {
		logout();
	};

	return (
		<div className="relative flex">
			<div className="flex flex-col justify-between w-64 h-screen p-2 overflow-auto bg-white shadow-xl w rounded-xl">
				<div className="h-full ">
					<NavLink to="/">
						<h1 className="mx-5 my-3 text-xl font-black font-logo">Gradebook</h1>
					</NavLink>

					<Sidebar items={items} className="mt-10 text-base" />
				</div>

				<div
					className="mx-auto mb-2 font-bold text-gray-500 transition-all cursor-pointer hover:text-blue-500"
					onClick={handleLogout}
				>
					<div className="flex items-center">
						<FontAwesomeIcon icon={faSignOut} size="lg" />
						<span className="ml-2">Logout</span>
					</div>
				</div>
			</div>

			<div className="flex-1 h-screen px-5 py-3 overflow-auto">
				<Suspense fallback={<FallbackSkeleton />}>
					<Outlet />
				</Suspense>
			</div>
		</div>
	);
};

export default AdminLayout;
