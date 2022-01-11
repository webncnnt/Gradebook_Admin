type UserFilterValue = {
	page?: number;
	limit?: number;
	order?: 'asc' | 'desc';
	sortBy?: string;
	email?: string;
	name?: string;
};

export default UserFilterValue;
