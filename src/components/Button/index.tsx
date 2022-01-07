import { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
	children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, className, ...rest }: ButtonProps) => {
	const base =
		'bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 transition-all rounded';

	const classes = className ? `${className} ${base}` : base;

	return (
		<button {...rest} className={classes}>
			{children}
		</button>
	);
};

export default Button;
