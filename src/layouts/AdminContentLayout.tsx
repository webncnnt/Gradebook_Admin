import { HTMLAttributes } from 'react';

type AdminContentLayoutProps = {
	header: string;
	className?: string;
	children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const AdminContentLayout = ({ header, className, children, ...rest }: AdminContentLayoutProps) => {
	return (
		<div className={className} {...rest}>
			<h1 className="text-3xl font-bold">{header}</h1>
			<div className="mt-10">{children}</div>
		</div>
	);
};

export default AdminContentLayout;
