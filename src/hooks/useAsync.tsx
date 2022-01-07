import React, { useState, useCallback } from 'react';

type AsyncExecuteStatus = 'idle' | 'pending' | 'success' | 'error';

const useAsync = <T, E = any>(
	asyncFunction: () => Promise<T>,
	deps?: React.DependencyList
) => {
	const [status, setStatus] = useState<AsyncExecuteStatus>('idle');
	const [value, setValue] = useState<T | null>(null);
	const [error, setError] = useState<E | null>(null);

	const execute = useCallback(() => {
		setStatus('pending');
		setValue(null);
		setError(null);

		return asyncFunction()
			.then((response: any) => {
				setValue(response);
				setStatus('success');
			})
			.catch((error: any) => {
				setError(error);
				setStatus('error');
			});
	}, [asyncFunction, deps]);

	return { execute, status, value, error };
};

export default useAsync;
