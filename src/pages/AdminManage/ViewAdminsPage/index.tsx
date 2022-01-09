import AdminDataGrid from '../../../components/AdminDataGrid';
import AdminContentLayout from '../../../layouts/AdminContentLayout';

const ViewAdminsPage = () => {
	return (
		<AdminContentLayout header="View Admins">
			<AdminDataGrid />
		</AdminContentLayout>
	);
};

export default ViewAdminsPage;
