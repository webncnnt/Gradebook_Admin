import { TextField } from '@mui/material';
import { HTMLAttributes, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ClassFilterValue from '../../../types/filter/ClassFilterValue';
import SearchClassFormData from '../../../types/form/SearchClassFormData';
import Button from '../../Button';

type ClassSearchProps = {
	filterValue: ClassFilterValue;
	onFilterChange: (filterValue: ClassFilterValue) => void;
} & HTMLAttributes<HTMLDivElement>;

const ClassSearch = ({ filterValue, onFilterChange, ...rest }: ClassSearchProps) => {
	const { register, setValue, handleSubmit } = useForm<SearchClassFormData>();

	useEffect(() => {
		setValue('className', filterValue.name);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterValue]);

	const handleFormSubmit = (formData: SearchClassFormData) => {
		const { className } = formData;

		onFilterChange({
			...filterValue,
			name: className
		});
	};

	return (
		<div {...rest}>
			<h2 className="text-lg font-bold text-gray-900">Search</h2>
			<form onSubmit={handleSubmit(handleFormSubmit)}>
				<div className="flex flex-row gap-2 mt-4">
					<TextField
						size="small"
						{...register('className')}
						autoFocus
						className="sm:w-full md:w-1/2 lg:w-1/3"
						InputLabelProps={{ shrink: true }}
						label="Name"
					/>
					<Button type="submit" className="px-4 py-2">
						Search
					</Button>
				</div>
			</form>
		</div>
	);
};

export default ClassSearch;
