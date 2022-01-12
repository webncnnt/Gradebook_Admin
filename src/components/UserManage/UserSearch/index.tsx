import { TextField } from '@mui/material';
import { HTMLAttributes, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import UserFilterValue from '../../../types/filter/UserFilterValue';
import SearchUserFormData from '../../../types/form/SearchUserFormData';
import Button from '../../Button';

type UserSearchProps = {
	filterValue: UserFilterValue;
	onFilterChange: (filterValue: UserFilterValue) => void;
} & HTMLAttributes<HTMLDivElement>;

const UserSearch = ({ filterValue, onFilterChange, ...rest }: UserSearchProps) => {
	const { register, handleSubmit, setValue } = useForm<SearchUserFormData>();

	const handleFormSubmit = (formData: SearchUserFormData) => {
		const { email, fullName } = formData;

		onFilterChange({
			...filterValue,
			email,
			name: fullName
		});
	};

	useEffect(() => {
		setValue('email', filterValue.email);
		setValue('fullName', filterValue.name);
	}, [filterValue]);

	return (
		<div {...rest}>
			<h2 className="text-lg font-bold text-gray-900">Search</h2>
			<form onSubmit={handleSubmit(handleFormSubmit)}>
				<div className="flex flex-row gap-2 mt-4">
					<TextField
						size="small"
						{...register('fullName')}
						autoFocus
						className="w-1/2 lg:w-1/3"
						InputLabelProps={{ shrink: true }}
						label="Name"
					/>
					<TextField
						size="small"
						{...register('email')}
						className="w-1/2 xl:w-1/3"
						InputLabelProps={{ shrink: true }}
						label="Email"
					/>
				</div>

				<Button type="submit" className="px-5 py-2 mt-3">
					Search
				</Button>
			</form>
		</div>
	);
};

export default UserSearch;
