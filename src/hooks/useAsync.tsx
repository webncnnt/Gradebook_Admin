import { useState, useCallback, useRef, useEffect } from 'react';

export type AsyncExecuteStatus = 'idle' | 'pending' | 'success' | 'error';

const useAsync = <T, E = any>(asyncFunction: (...args: any[]) => Promise<T>) => {
	const [status, setStatus] = useState<AsyncExecuteStatus>('idle');
	const [value, setValue] = useState<T | null>(null);
	const [error, setError] = useState<E | null>(null);

	const pendingTime = useRef<number>(0);
	const mountedRef = useRef<boolean>();

	useEffect(() => {
		mountedRef.current = true;

		return () => {
			mountedRef.current = false;
		};
	}, []);

	const execute = useCallback(
		(...args) => {
			setStatus('pending');
			setValue(null);
			setError(null);
			pendingTime.current = 0;

			const timer = setInterval(() => {
				pendingTime.current++;
			}, 1000);

			return asyncFunction(...args)
				.then((response: T) => {
					if (!mountedRef.current) return null;
					setValue(response);
					setStatus('success');
				})
				.catch((error: any) => {
					setError(error);
					setStatus('error');
				})
				.finally(() => {
					clearInterval(timer);
				});
		},
		[asyncFunction]
	);

	return { execute, status, value, error, pendingTime: pendingTime.current };
};

export default useAsync;
