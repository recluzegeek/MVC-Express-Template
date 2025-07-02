export interface HabitUpdateDto {
	name?: string;
	description?: string;
	status?: string;
	frequency?: string;
	categoryId?: number;
	userId: string;
}
