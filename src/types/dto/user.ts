export type UserRole = "customer" | "admin";

export interface UserDto {
  id: string;
  name: string;
  email?: string;
  mobile?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequestDto {
  name?: string;
  email?: string;
  mobile?: string;
}
