import { matchPath, Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

type AuthGuardProps = {
	redirectTo?: string;
	role?: 'admin' | 'guest';
};

const AuthGuard = ({ redirectTo, role = 'guest' }: AuthGuardProps) => {
	const location = useLocation();
	const { currentUser } = useAuth();

	const currentRole = currentUser ? 'admin' : 'guest';

	if (currentRole !== role && redirectTo) {
		if (matchPath(location.pathname, redirectTo)) {
			return null;
		}

		return <Navigate to={redirectTo} replace />;
	}

	if (currentRole !== role && !redirectTo) {
		return null;
	}

	return <Outlet />;
};

export default AuthGuard;
