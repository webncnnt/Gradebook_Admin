import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
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
	const [collapsed, setCollapsed] = useState(true);

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

	const renderContent = () => {
		return (
			<div className={classes} onClick={handleMenuClick}>
				<FontAwesomeIcon icon={item.icon} />
				<div className="flex-1 ml-4">
					<span>{item.name}</span>
				</div>
				{children &&
					(collapsed ? (
						<FontAwesomeIcon size="sm" icon={faAngleUp} />
					) : (
						<FontAwesomeIcon size="sm" icon={faAngleDown} />
					))}
			</div>
		);
	};

	return (
		<div className={className} {...rest}>
			{item.items ? (
				renderContent()
			) : (
				<NavLink to={item.path}>{renderContent()}</NavLink>
			)}

			{collapsed && <div className="pl-5">{children}</div>}
		</div>
	);
};

export default SideBarMenuItem;
