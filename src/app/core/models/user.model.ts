import { PointData } from "./point.model";

/**
 * Пользователь.
 */
export interface User {
  email: string;
  firstName: string;
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

export interface RegisterResponse {
  token: string;
};

export interface LoginResponse {
  token: string;
};

export type BloodType = 'O+' | 'O-' | 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-';
