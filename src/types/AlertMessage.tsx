type AlertType = 'error' | 'success';

type AlertMessage = {
	message: string;
	type: AlertType;
};

export type { AlertType, AlertMessage };
