import { TextField } from '@mui/material';
import { HTMLAttributes, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useSearchParams } from 'react-router-dom';
import UserFilterValue from '../../../types/filter/UserFilterValue';
import SearchUserFormData from '../../../types/form/SearchUserFormData';
import Button from '../../Button';
import queryString from 'query-string';

type UserSearchProps = {} & HTMLAttributes<HTMLDivElement>;

const UserSearch = ({ ...rest }: UserSearchProps) => {
	const location = useLocation();
	const [, setSearchParams] = useSearchParams();

	const initialParams = useMemo<UserFilterValue>(() => {
		const { name, email } = queryString.parse(location.search);
		const values: UserFilterValue = {};

		values.name = name && !Array.isArray(name) ? name : undefined;
		values.email = email && !Array.isArray(email) ? email : undefined;

		return values;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { register, handleSubmit } = useForm<SearchUserFormData>();
	const [filterValue, setFilterValue] = useState<UserFilterValue>(initialParams);
	const [hasSelectedRow, setHasSelectedRow] = useState<boolean>(false);

	const handleFormSubmit = (formData: SearchUserFormData) => {};

	return (
		<div {...rest}>
			<h2 className="text-lg font-bold text-gray-900">Search</h2>
			<form onSubmit={handleSubmit(handleFormSubmit)}>
				<div className="flex flex-row gap-2 mt-4">
					<TextField
						{...register('fullName')}
						autoFocus
						className="w-1/2 lg:w-1/3"
						InputLabelProps={{ shrink: true }}
						label="Name"
					/>
					<TextField
						{...register('email')}
						className="w-1/2 xl:w-1/3"
						InputLabelProps={{ shrink: true }}
						label="Email"
					/>
				</div>

				<Button type="submit" className="px-4 py-2 mt-3">
					Search
				</Button>
			</form>
		</div>
	);
};

export default UserSearch;
