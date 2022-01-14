import { useEffect, useState } from 'react';
import useAlert from '../../../hooks/useAlert';
import useAsync from '../../../hooks/useAsync';
import userApi from '../../../services/apis/userApi';
import { UserModel } from '../../../types/models/userModel';
import Button from '../../Button';
import TextFieldWithShrink from '../../TextFieldWithShrink';

type UserInforProps = {
	userId: string;
};

const UserInfor = ({ userId }: UserInforProps) => {
	const { addMessage } = useAlert();
	const [editable, setEditable] = useState(false);
	const [user, setUser] = useState<UserModel | null>(null);
	const { execute, status, value, error } = useAsync(() => userApi.getUser(+userId));

	useEffect(() => {
		if (userId === null) return;
		if (!parseInt(userId)) return;

		execute();
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId]);

	useEffect(() => {
		if (status !== 'error') return;
		if (error === null) return;

		addMessage(error.data.message, 'error');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error]);

	useEffect(() => {
		if (status !== 'success') return;
		if (value === null) return;

		setUser(value.data.data as UserModel);
	}, [status, value]);

	const handleEditClick = () => {
		setEditable((prev) => !prev);
	};

	return (
		<div className="px-5 py-5 bg-white rounded-md shadow-md">
			{user && (
				<div aria-label="user-information">
					<img
						src={user?.avatar || '/DefaultUserAvatar.jpg'}
						alt="avatar"
						className="object-cover w-32 h-32 bg-black rounded-full lg:h-40 lg:w-40"
					/>

					<div className="flex flex-col gap-4 mt-7">
						<TextFieldWithShrink
							disabled={!editable}
							className="w-full lg:w-2/3"
							value={user?.fullName}
							size="small"
							label="Full Name"
						/>
						<TextFieldWithShrink
							disabled={!editable}
							className="w-full lg:w-2/3"
							value={user?.email}
							size="small"
							label="Email"
						/>
						<TextFieldWithShrink
							disabled={!editable}
							className="w-full lg:w-2/3"
							value="************"
							size="small"
							label="Password"
						/>
						<TextFieldWithShrink
							disabled
							className="w-full lg:w-2/3"
							value={user.dob}
							size="small"
							label="Birthday"
						/>
						<TextFieldWithShrink
							disabled
							className="w-full lg:w-2/3"
							value={user.facebook}
							size="small"
							label="Facebook"
						/>
						<TextFieldWithShrink
							disabled
							className="w-full lg:w-2/3"
							value={user.numberPhone}
							size="small"
							label="Number Phone"
						/>
						<TextFieldWithShrink
							disabled
							className="w-full lg:w-2/3"
							value={user.role}
							size="small"
							label="Role"
						/>
						<TextFieldWithShrink
							disabled
							className="w-full lg:w-2/3"
							value={user.createdAt}
							size="small"
							label="Created At"
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

export default UserInfor;
