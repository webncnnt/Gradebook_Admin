import ClassDataGrid from '../../../components/ClassDataGrid';
import AdminContentLayout from '../../../layouts/AdminContentLayout';

const ViewClassesPage = () => {
	return (
		<AdminContentLayout header="View Classes">
			<ClassDataGrid />
		</AdminContentLayout>
	);
};

export default ViewClassesPage;
