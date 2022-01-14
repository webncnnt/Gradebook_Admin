import { useParams } from 'react-router-dom';
import ClassInfor from '../../../components/ClassManage/ClassInfor';
import AdminContentLayout from '../../../layouts/AdminContentLayout';

const ClassInforPage = () => {
	const { id } = useParams();

	return (
		<AdminContentLayout header="Information">
			<ClassInfor classId={id!} />
		</AdminContentLayout>
	);
};

export default ClassInforPage;
