import { PointData } from "./point.model";

/**
 * Пользователь.
 */
export interface User extends UserDTO {
  token?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  tag: string;
}

export interface UserDTO {
  userId: number;
  email: string;
  password: string;
  firstName: string | null;
  tag: string | null;
  city: string | null;
  bloodType: BloodType | null;
}

export interface RegisterResponse {
  token: string;
  userDto: UserDTO;
};

export interface LoginResponse {
  token: string;
  userDto: UserDTO;
};

export type BloodType = 'O+' | 'O-' | 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-';
