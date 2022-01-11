import ClassDataGrid from '../../../components/ClassManage/ClassDataGrid';
import AdminContentLayout from '../../../layouts/AdminContentLayout';

const ViewClassesPage = () => {
	return (
		<AdminContentLayout header="View Classes">
			<ClassDataGrid />
		</AdminContentLayout>
	);
};

export default ViewClassesPage;
