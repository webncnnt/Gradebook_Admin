import React, { useCallback, useState } from 'react';
import { AlertMessage, AlertType } from '../types/AlertMessage';

type AlertContextType = {
	messages: AlertMessage[];
	addMessage: (message: string, type: AlertType) => void;
	removeMessage: (message: string, type: AlertType) => void;
};

type AlertProviderProps = {
	children: any;
};

const AlertContext = React.createContext<AlertContextType>({} as AlertContextType);

const AlertProvider = ({ children }: AlertProviderProps) => {
	const [messages, setMessages] = useState<AlertMessage[]>([]);

	const addMessage = useCallback((message: string, type: AlertType) => {
		setMessages((messages) => [...messages, { message, type }]);
	}, []);

	const removeMessage = useCallback((message: string, type: AlertType) => {
		setMessages((messages) => messages.filter((m) => m.message !== message && m.type !== type));
	}, []);

	return (
		<AlertContext.Provider value={{ messages, addMessage, removeMessage }}>
			{children}
		</AlertContext.Provider>
	);
};

export { AlertContext, AlertProvider };
