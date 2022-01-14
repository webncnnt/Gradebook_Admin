import { useEffect, useState } from 'react';
import useAlert from '../../../hooks/useAlert';
import useAsync from '../../../hooks/useAsync';
import classApi from '../../../services/apis/classApi';
import ClassModel from '../../../types/models/ClassModel';
import Button from '../../Button';
import TextFieldWithShrink from '../../TextFieldWithShrink';

type ClassInforProps = {
	classId: string;
};

const ClassInfor = ({ classId }: ClassInforProps) => {
	const { addMessage } = useAlert();
	const [editable, setEditable] = useState(false);
	const [clazz, setClass] = useState<ClassModel | null>(null);
	const { execute, status, value, error } = useAsync(() => classApi.getClass(+classId));

	useEffect(() => {
		if (classId === null) return;
		execute();
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [classId]);

	useEffect(() => {
		if (status !== 'error') return;
		if (error === null) return;

		addMessage(error.data.message, 'error');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error]);

	useEffect(() => {
		if (status !== 'success') return;
		if (value === null) return;

		setClass(value.data.data as ClassModel);
	}, [status, value]);

	const handleEditClick = () => {
		setEditable((prev) => !prev);
	};

	return (
		<div className="px-5 py-5 bg-white rounded-md shadow-md">
			{clazz && (
				<div aria-label="class-information">
					<img
						src={clazz.coverImage}
						alt="avatar"
						className="object-cover w-32 h-32 bg-black rounded-full lg:h-40 lg:w-40"
					/>

					<div className="flex flex-col gap-4 mt-7">
						<TextFieldWithShrink
							disabled={!editable}
							className="w-full lg:w-2/3"
							value={clazz.className}
							size="small"
							label="Class Name"
						/>
						<TextFieldWithShrink
							disabled={!editable}
							className="w-full lg:w-2/3"
							value={clazz.inviteCode}
							size="small"
							label="Invite Code"
						/>
						<TextFieldWithShrink
							disabled={!editable}
							className="w-full lg:w-2/3"
							value={clazz.ownerId}
							size="small"
							label="Owner Id"
						/>
						<TextFieldWithShrink
							disabled
							className="w-full lg:w-2/3"
							value={clazz.createdAt}
							size="small"
							label="Created At"
						/>
						<TextFieldWithShrink
							disabled={!editable}
							className="w-full lg:w-2/3"
							value={clazz.description}
							size="small"
							label="Description"
						/>
					</div>
				</div>
			)}

			<Button onClick={handleEditClick} className="px-5 py-2 mt-7">
				{editable ? 'Save' : 'Edit'}
			</Button>
		</div>
	);
};

export default ClassInfor;
