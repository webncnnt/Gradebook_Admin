import { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
	color?: 'primary' | 'alert' | 'gray';
	children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const colors = {
	primary: 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white',
	alert: 'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white',
	gray: 'bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white'
};

const Button = ({
	color = 'primary',
	children,
	className,
	...rest
}: ButtonProps) => {
	const base = `text-white transition-all rounded-md ${colors[color]}`;

	const classes = className ? `${className} ${base}` : base;

	return (
		<button {...rest} className={classes}>
			{children}
		</button>
	);
};

export default Button;
