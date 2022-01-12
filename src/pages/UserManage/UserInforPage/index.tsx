import { Navigate, useParams } from 'react-router-dom';
import UserInfor from '../../../components/UserManage/UserInfor';
import AdminContentLayout from '../../../layouts/AdminContentLayout';

const UserInforPage = () => {
	const { id } = useParams();
	return (
		<AdminContentLayout header="Profile">
			{id ? <UserInfor userId={id} /> : <Navigate to="/user" />}
		</AdminContentLayout>
	);
};

export default UserInforPage;
