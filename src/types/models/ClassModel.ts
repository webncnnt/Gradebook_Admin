type ClassModel = {
	id: number;
	className: string;
	ownerId: number;
	inviteCode: string;
	coverImage?: string;
	description?: string;
	status: 'active' | 'blocked';
	expiredTime?: Date;
	createdAt: Date;
};

export default ClassModel;
