export type UserModel = {
	id: number;
	fullName: string;
	email: string;
	avatar?: string;
	dob?: Date;
	numberPhone?: string;
	status: boolean; // true: block
	createdAt: Date;
	facebook?: string;
	role: number;
};
