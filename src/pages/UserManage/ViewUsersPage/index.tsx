import UserDataGrid from '../../../components/UserDataGrid';
import AdminContentLayout from '../../../layouts/AdminContentLayout';

const ViewUsersPage = () => {
	return (
		<AdminContentLayout header="View Users">
			<UserDataGrid />
		</AdminContentLayout>
	);
};

export default ViewUsersPage;
