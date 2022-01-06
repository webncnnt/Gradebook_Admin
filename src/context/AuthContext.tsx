import React, { useState } from 'react';
import authApi from '../services/apis/authApi';
import LoginFormData from '../types/form/LoginFormData';
import { UserModel } from '../types/models/userModel';

type AuthContextType = {
	currentUser: UserModel | null;
	login: (formData: LoginFormData) => Promise<void>;
	logout: () => void;
};

type AuthProviderProps = {
	children: React.ReactNode;
};

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: AuthProviderProps) => {
	const [currentUser, setCurrentUser] = useState<UserModel | null>(null);

	const login = async (formData: LoginFormData) => {
		const res = await authApi.postLogin(formData.email, formData.password);
		const userData = res.data;
	};

	const logout = async () => {
		setCurrentUser(null);
		localStorage.removeItem('access_token');
	};

	return (
		<AuthContext.Provider value={{ currentUser, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
