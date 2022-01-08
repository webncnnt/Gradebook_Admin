import { useState, useCallback } from 'react';

type AsyncExecuteStatus = 'idle' | 'pending' | 'success' | 'error';

const useAsync = <T, E = any>(
	asyncFunction: (...args: any[]) => Promise<T>
) => {
	const [status, setStatus] = useState<AsyncExecuteStatus>('idle');
	const [value, setValue] = useState<T | null>(null);
	const [error, setError] = useState<E | null>(null);

	const execute = useCallback(
		(...args) => {
			setStatus('pending');
			setValue(null);
			setError(null);

			return asyncFunction(...args)
				.then((response: any) => {
					setValue(response);
					setStatus('success');
				})
				.catch((error: any) => {
					setError(error);
					setStatus('error');
				});
		},
		[asyncFunction]
	);

	return { execute, status, value, error };
};

export default useAsync;
