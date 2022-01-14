import { HTMLAttributes, useMemo } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import SideBarMenuItem from './SideBarMenuItem';
import SidebarItem from './type';

type SidebarProps = {
	items: SidebarItem[];
} & HTMLAttributes<HTMLDivElement>;

const Sidebar = ({ items, className, ...rest }: SidebarProps) => {
	const location = useLocation();

	const checkMenuItemActive = (item: SidebarItem): boolean => {
		if (!item.path) {
			return false;
		}

		if (matchPath(location.pathname, item.path)) {
			return true;
		}

		if (item.activePaths) {
			return item.activePaths.some(
				(activePath) => matchPath(activePath, location.pathname) !== null
			);
		}

		return false;
	};

	const createSideBarMenuItem = (item: SidebarItem) => {
		const isActive = checkMenuItemActive(item);

		return (
			<SideBarMenuItem
				className={isActive ? 'text-blue-700 pointer-events-none' : 'text-gray-500'}
				item={item}
				key={item.path || item.name}
				active={isActive}
			>
				{item.items && item.items.map((item) => createSideBarMenuItem(item))}
			</SideBarMenuItem>
		);
	};

	const renderMenuItems = useMemo(
		() => <ul>{items.map((item) => createSideBarMenuItem(item))}</ul>,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[location.pathname]
	);

	return (
		<div className={className} {...rest}>
			{renderMenuItems}
		</div>
	);
};

export default Sidebar;
