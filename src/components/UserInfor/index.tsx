import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import useAlert from '../../hooks/useAlert';
import useAsync from '../../hooks/useAsync';
import userApi from '../../services/apis/userApi';
import { UserModel } from '../../types/models/userModel';

type UserInforProps = {
	userId: string;
};

const UserInfor = ({ userId }: UserInforProps) => {
	const { addMessage } = useAlert();

	const [user, setUser] = useState<UserModel | null>(null);

	const { execute, status, value, error } = useAsync(async (userId: number) =>
		userApi.getUser(userId)
	);

	useEffect(() => {
		if (status !== 'error') return;
		if (error === null) return;

		addMessage(error.data.message, 'error');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error]);

	useEffect(() => {
		if (status !== 'success') return;
		if (value === null) return;

		setUser(value.data.response as UserModel);
	}, [status, value]);

	useEffect(() => {
		if (userId === null) return;
		if (!parseInt(userId)) return;

		execute(userId);
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId]);

	return (
		<div className="flex flex-col gap-3">
			<TextField label="aaa" />
			<TextField label="aaa" />
			<TextField label="aaa" />
			<TextField label="aaa" />
			<TextField label="aaa" />
			<TextField label="aaa" />
			<TextField label="aaa" />
		</div>
	);
};

export default UserInfor;
