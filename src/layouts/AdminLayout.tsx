import {
	faAdd,
	faGraduationCap,
	faList,
	faScrewdriverWrench,
	faUsers
} from '@fortawesome/free-solid-svg-icons';
import { NavLink, Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import SidebarItem from '../components/Sidebar/type';

const items: SidebarItem[] = [
	{
		name: 'Class',
		path: '/class',
		icon: faGraduationCap,
		items: [
			{
				path: '/class/viewClasses',
				name: 'View Classes',
				icon: faList
			}
		]
	},
	{
		name: 'User',
		path: '/user',
		icon: faUsers,
		items: [
			{
				path: '/user/viewUsers',
				name: 'View Users',
				icon: faList
			}
		]
	},
	{
		name: 'Admin',
		path: '/admin',
		icon: faScrewdriverWrench,
		items: [
			{
				path: '/admin/viewAdmins',
				name: 'View Admins',
				icon: faList
			},
			{
				path: '/admin/addAdmin',
				name: 'Add Admin',
				icon: faAdd
			}
		]
	}
];

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
				<Outlet />
			</div>
		</div>
	);
};

export default AdminLayout;
