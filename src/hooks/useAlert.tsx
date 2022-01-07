import { useContext } from 'react';
import { AlertContext } from '../context/AlertContext';

const useAlert = () => {
	const value = useContext(AlertContext);

	if (!value) throw new Error('useAlert must be used within an AlertProvider');

	const { messages, addMessage, removeMessage } = value;

	return { messages, addMessage, removeMessage };
};

export default useAlert;
