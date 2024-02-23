import { PointData } from "./point.model";

/**
 * Пользователь.
 */
export interface User {
  username: string;
  points: PointData[];
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
