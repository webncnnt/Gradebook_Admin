import React, { useCallback, useEffect, useState } from 'react';
import useAlert from '../hooks/useAlert';
import useAsync from '../hooks/useAsync';
import authApi from '../services/apis/authApi';
import userApi from '../services/apis/userApi';
import LoginFormData from '../types/form/LoginFormData';
import { UserModel } from '../types/models/userModel';

type AuthContextType = {
	currentUser: UserModel | null;
	revalidating: boolean;
	login: (formData: LoginFormData) => Promise<void>;
	logout: () => void;
};

type AuthProviderProps = {
	children: React.ReactNode;
};

const AuthContext = React.createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
	const { addMessage } = useAlert();
	const [currentUser, setCurrentUser] = useState<UserModel | null>(null);
	const [revalidating, setRevalidating] = useState(true);
	const { execute, status, value, error } = useAsync(userApi.getMe);

	useEffect(() => {
		const accessToken = localStorage.getItem('access_token');

		if (accessToken) {
			execute();
			setRevalidating(true);
		}

		if (!accessToken) {
			setRevalidating(false);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (status !== 'success') return;
		if (value === null) return;

		setCurrentUser(value.data.profile as UserModel);
	}, [status, value]);

	useEffect(() => {
		if (status === 'success') {
			setRevalidating(false);
		}
	}, [status, value]);

	useEffect(() => {
		if (status === 'error') {
			localStorage.removeItem('access_token');
			setRevalidating(false);
		}
	}, [status, error]);

	const login = useCallback(async (formData: LoginFormData) => {
		const res = await authApi.postLogin(formData.email, formData.password);

		if (res.data.user.role !== 1) {
			addMessage('You are not allowed to login', 'error');
			return;
		}

		localStorage.setItem('access_token', res.data.accessToken);
		setCurrentUser(res.data.user as UserModel);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const logout = useCallback(async () => {
		setCurrentUser(null);
		localStorage.removeItem('access_token');
	}, []);

	return (
		<AuthContext.Provider value={{ currentUser, revalidating, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
