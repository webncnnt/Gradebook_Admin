import AdminDataGrid from '../../../components/AdminManage/AdminDataGrid';
import AdminContentLayout from '../../../layouts/AdminContentLayout';

const ViewAdminsPage = () => {
	return (
		<AdminContentLayout header="View Admins">
			<AdminDataGrid />
		</AdminContentLayout>
	);
};

export default ViewAdminsPage;
