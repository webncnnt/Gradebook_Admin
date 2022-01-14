import FilterBase from './FilterBase';

type AdminFilterValue = {
	email?: string;
	name?: string;
} & FilterBase;

export default AdminFilterValue;
