import { HTMLAttributes, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SideBarMenuItem from './SideBarMenuItem';
import SidebarItem from './type';

type SidebarProps = {
	items: SidebarItem[];
} & HTMLAttributes<HTMLDivElement>;

const Sidebar = ({ items, className, ...rest }: SidebarProps) => {
	const location = useLocation();
	const [activePath, setActivePath] = useState<string | null>(null);

	useEffect(() => {
		setActivePath(location.pathname);
	}, [location]);

	const handleClick = (item: SidebarItem) => {
		console.log(item);
	};

	const createSideBarMenuItem = (item: SidebarItem) => {
		const isActive = activePath === item.path && !item.items;

		return (
			<SideBarMenuItem
				className={isActive ? 'text-blue-700' : 'text-gray-500'}
				item={item}
				key={item.path}
				active={isActive}
				onMenuClick={handleClick}
			>
				{item.items && item.items.map((item) => createSideBarMenuItem(item))}
			</SideBarMenuItem>
		);
	};

	return (
		<div className={className} {...rest}>
			<ul>{items.map((item) => createSideBarMenuItem(item))}</ul>
		</div>
	);
};

export default Sidebar;
