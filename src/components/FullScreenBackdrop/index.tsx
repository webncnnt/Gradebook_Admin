import classNames from 'classnames';
import { HTMLAttributes } from 'react';

type FullScreenBackdropProps = {
	children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const FullScreenBackdrop = ({ children, className, ...rest }: FullScreenBackdropProps) => {
	const classes = classNames('fixed z-50 w-screen h-screen', className);

	return (
		<div {...rest} className={classes}>
			{children}
		</div>
	);
};

export default FullScreenBackdrop;
