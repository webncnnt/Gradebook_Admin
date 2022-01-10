import {
	faAdd,
	faGraduationCap,
	faList,
	faScrewdriverWrench,
	faUsers
} from '@fortawesome/free-solid-svg-icons';
import { Skeleton } from '@mui/material';
import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import SidebarItem from '../components/Sidebar/type';
import ROUTES from '../constants/route';

const items: SidebarItem[] = [
	{
		name: 'Class',
		icon: faGraduationCap,
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
	return (
		<div className="relative flex">
			<div className="w-64 h-screen p-2 overflow-auto bg-white shadow-xl rounded-xl">
				<NavLink to="/">
					<h1 className="mx-5 my-3 text-xl font-black font-logo">Gradebook</h1>
				</NavLink>

				<Sidebar items={items} className="mt-10" />
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
