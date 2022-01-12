type FilterBase = {
	page?: number;
	limit?: number;
	order?: 'asc' | 'desc';
	sortBy?: string;
};

export default FilterBase;
