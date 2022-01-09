type ClassModel = {
	id: number;
	clsName: string;
	ownerId: number;
	inviteCode: string;
	coverImage: string | null;
	description: string | null;
	status: number;
	expiredTime: Date | null;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
};

export default ClassModel;
