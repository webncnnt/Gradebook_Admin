import { useParams } from 'react-router-dom';
import ClassInfor from '../../../components/ClassManage/ClassInfor';

const ClassInforPage = () => {
	const { classId } = useParams();

	return <ClassInfor classId={classId!} />;
};

export default ClassInforPage;
