import { Alert, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import useAlert from '../../hooks/useAlert';
import { AlertMessage } from '../../types/AlertMessage';

const AlertNotification = () => {
	const { messages, removeMessage } = useAlert();
	const [open, setOpen] = useState(false);
	const [currentMessage, setCurrentMessage] = useState<AlertMessage | null>(
		null
	);

	useEffect(() => {
		if (messages.length > 0) {
			setCurrentMessage(messages[0]);
			setOpen(true);
		}
	}, [messages]);

	const handleClose = () => {
		setOpen(false);
		removeMessage(currentMessage!.message, currentMessage!.type);
	};

	return currentMessage ? (
		<Snackbar
			open={open}
			className="shadow-2xl"
			autoHideDuration={3000}
			onClose={handleClose}
		>
			<Alert
				onClose={handleClose}
				severity={currentMessage!.type}
				sx={{ width: '100%' }}
			>
				{currentMessage!.message}
			</Alert>
		</Snackbar>
	) : null;
};

export default AlertNotification;
