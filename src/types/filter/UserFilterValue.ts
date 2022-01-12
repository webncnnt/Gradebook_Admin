import FilterBase from './FilterBase';

type UserFilterValue = {
	email?: string;
	name?: string;
} & FilterBase;

export default UserFilterValue;
