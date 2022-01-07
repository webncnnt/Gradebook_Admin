import {
	faAdd,
	faFontAwesomeFlag,
	faGraduationCap,
	faList,
	faScrewdriverWrench,
	faUsers
} from '@fortawesome/free-solid-svg-icons';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import SidebarItem from '../components/Sidebar/type';

const items: SidebarItem[] = [
	{
		name: 'Class',
		path: '/class',
		icon: faGraduationCap
	},
	{
		name: 'User Management',
		path: '/user',
		icon: faUsers
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
		<div className="relative">
			<div className="w-64 h-screen p-2 overflow-auto bg-white shadow-xl rounded-xl">
				<h1 className="mx-5 my-3 text-2xl font-black font-logo">Gradebook</h1>
				<Sidebar items={items} className="mt-10" />
			</div>

			<Outlet />
		</div>
	);
};

export default AdminLayout;
