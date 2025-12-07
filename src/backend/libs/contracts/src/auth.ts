// Authentication DTOs

export interface RegisterRequestDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface LoginRequestDto {
  email: string;
  password?: string;
  isBiometric?: boolean;
}

export interface LoginResponseDto {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface RefreshTokenRequestDto {
  refreshToken: string;
}

export interface LogoutRequestDto {
  refreshToken: string;
}

export interface ForgotPasswordRequestDto {
  email: string;
}

export interface ResetPasswordRequestDto {
  token: string;
  newPassword: string;
}

export interface ChangePasswordRequestDto {
  userId: string;
  currentPassword: string;
  newPassword: string;
}

export interface UserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  emailVerified: boolean;
  mfaEnabled: boolean;
  status: "ACTIVE" | "SUSPENDED" | "DELETED";
  createdAt: string;
}

export interface TokenPayloadDto {
  sub: string;
  email: string;
  type: "access" | "refresh";
}
