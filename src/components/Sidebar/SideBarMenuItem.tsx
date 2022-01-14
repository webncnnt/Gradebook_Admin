import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { matchPath, NavLink, useLocation } from 'react-router-dom';
import SidebarItem from './type';

type SideBarMenuItemProps = {
	item: SidebarItem;
	className?: string;
	active?: boolean;
	onMenuClick?: (item: SidebarItem) => void;
} & React.HTMLAttributes<HTMLElement>;

const SideBarMenuItem = ({
	item,
	className,
	active = false,
	onMenuClick,
	children,
	...rest
}: SideBarMenuItemProps) => {
	const location = useLocation();

	const initialCollapse = useMemo(() => {
		if (!item.items) return true;
		if (item.items.some((p) => matchPath(p.path!, location.pathname))) {
			return false;
		}
		return true;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [collapsed, setCollapsed] = useState(initialCollapse);

	const classes = classNames(
		'w-full text-left',
		'rounded-md px-5 py-3',
		'flex items-center cursor-pointer',
		'font-semibold',
		'transition-all',
		{
			'hover:bg-gray-200': active === false
		},
		className
	);

	const handleMenuClick = () => {
		setCollapsed((prev) => !prev);
		onMenuClick?.(item);
	};

	const renderCollapseIcon = () => {
		const classes = classNames(collapsed ? '-rotate-180' : 'rotate-0', 'transition-all');
		return (
			<div className={classes}>
				<FontAwesomeIcon size="sm" icon={faAngleUp} />
			</div>
		);
	};

	const renderItem = () => {
		return (
			<div className={classes} onClick={handleMenuClick}>
				<FontAwesomeIcon icon={item.icon} />
				<div className="flex-1 ml-4">
					<span>{item.name}</span>
				</div>
				{children && renderCollapseIcon()}
			</div>
		);
	};

	const renderCollapseContent = () => {
		const classes = classNames(
			collapsed ? 'max-h-0 opacity-0 invisible' : 'max-h-24 opacity-100 visible',
			'transition-all pl-5'
		);
		return <div className={classes}>{children}</div>;
	};

	return (
		<div className={className} {...rest}>
			{item.path ? <NavLink to={item.path}>{renderItem()}</NavLink> : renderItem()}
			{renderCollapseContent()}
		</div>
	);
};

export default SideBarMenuItem;
