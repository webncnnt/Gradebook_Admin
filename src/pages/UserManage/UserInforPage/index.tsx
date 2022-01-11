import { Navigate, useParams } from 'react-router-dom';
import UserInfor from '../../../components/UserManage/UserInfor';

const UserInforPage = () => {
	const { id } = useParams();
	return id ? <UserInfor userId={id} /> : <Navigate to="/user" />;
};

export default UserInforPage;
