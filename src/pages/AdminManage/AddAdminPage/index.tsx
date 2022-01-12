import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateAdminForm from '../../../components/AdminManage/CreateAdminForm';
import FullScreenBackdrop from '../../../components/FullScreenBackdrop';
import useAlert from '../../../hooks/useAlert';
import useAsync from '../../../hooks/useAsync';
import AdminContentLayout from '../../../layouts/AdminContentLayout';
import adminApi from '../../../services/apis/adminApi';
import RegisterAdminFormData from '../../../types/form/RegisterAdminFormData';

const AddAdminPage = () => {
	const navigate = useNavigate();
	const { addMessage } = useAlert();
	const { execute, status, value, error } = useAsync(async (formData: RegisterAdminFormData) =>
		adminApi.postCreateAdmin(formData)
	);

	useEffect(() => {
		if (status !== 'error') return;
		if (error === null) return;

		addMessage(error.data.message, 'error');
	}, [status, error, addMessage]);

	useEffect(() => {
		if (status !== 'success') return;
		if (value === null) return;

		addMessage('Admin created successfully', 'success');

		const timer = setTimeout(() => {
			navigate('/admin/viewAdmins');
		}, 2000);

		return () => clearTimeout(timer);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status, value]);

	const handleSubmit = (formData: RegisterAdminFormData) => {
		execute(formData);
	};

	return (
		<AdminContentLayout header="Add Admin">
			<CreateAdminForm
				className="px-5 pb-5 bg-white rounded-md shadow-md pt-7"
				onSubmit={handleSubmit}
			/>
			;
			{status === 'pending' && (
				<FullScreenBackdrop className="flex items-center justify-center bg-gray-900 opacity-60">
					<CircularProgress />
				</FullScreenBackdrop>
			)}
		</AdminContentLayout>
	);
};

export default AddAdminPage;
