import type { UserDto } from "./user";

export type AuthMethod = "mobile" | "email";

export interface SendOtpRequestDto {
  credential: string;
  method: AuthMethod;
}

export interface SendOtpResponseDto {
  requestId: string;
  maskedCredential: string;
  expiresAt: string;
}

export interface VerifyOtpRequestDto {
  requestId: string;
  credential: string;
  method: AuthMethod;
  otp: string;
}

export interface AuthTokenDto {
  accessToken: string;
  refreshToken: string;
  /** seconds until expiry */
  expiresIn: number;
  user: UserDto;
}

export interface RefreshTokenRequestDto {
  refreshToken: string;
}
