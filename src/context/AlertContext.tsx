import React, { useState } from 'react';
import { AlertMessage, AlertType } from '../types/AlertMessage';

type AuthContextType = {
	messages: AlertMessage[];
	addMessage: (message: string, type: AlertType) => void;
	removeMessage: (message: string, type: AlertType) => void;
};

type AlertProviderProps = {
	children: any;
};

const AlertContext = React.createContext<AuthContextType>(
	{} as AuthContextType
);

const AlertProvider = ({ children }: AlertProviderProps) => {
	const [messages, setMessages] = useState<AlertMessage[]>([]);

	const addMessage = (message: string, type: AlertType) => {
		setMessages([...messages, { message, type }]);
	};

	const removeMessage = (message: string, type: AlertType) => {
		setMessages(
			messages.filter((m) => m.message !== message && m.type !== type)
		);
	};

	return (
		<AlertContext.Provider value={{ messages, addMessage, removeMessage }}>
			{children}
		</AlertContext.Provider>
	);
};

export { AlertContext, AlertProvider };
