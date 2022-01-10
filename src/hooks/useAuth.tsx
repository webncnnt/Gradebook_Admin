import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
	const value = useContext(AuthContext);

	if (!value) throw new Error('useAuth must be used within an AuthProvider');

	const { currentUser, login, logout, revalidating } = value;

	return {
		currentUser,
		login,
		logout,
		revalidating
	};
};

export default useAuth;
