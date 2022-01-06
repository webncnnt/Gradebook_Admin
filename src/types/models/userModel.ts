export type UserModel = {
	id: number;
	fullname: string;
	email: string;
	avatar?: string;
	dob?: Date;
	numberPhone?: string;
	status: boolean; // true: block
};
