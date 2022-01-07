import { IconProp } from '@fortawesome/fontawesome-svg-core';

type SidebarItem = {
	name: string;
	path: string;
	icon: IconProp;
	items?: SidebarItem[];
};

export default SidebarItem;
