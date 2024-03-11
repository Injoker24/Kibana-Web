import {
  AuthLoginRequest,
  AuthLoginResponse,
  AuthRegisterRequest,
  AuthRegisterResponse,
} from 'services/schemas';

export interface AuthLoginOutput {
  isFreelancer: boolean;
  isConnectedBank: boolean;
  profileImageUrl?: string;
  username: string;
  name: string;
  token: string;
  id: string;
}

export interface AuthLoginInput {
  usernameEmail: string;
  password: string;
}

export function transformToAuthLoginOutput(response: AuthLoginResponse): AuthLoginOutput {
  const result: AuthLoginOutput = {
    isFreelancer: response.is_freelancer,
    isConnectedBank: response.is_connected_bank,
    profileImageUrl: response.profile_image_url || '',
    username: response.username,
    name: response.name,
    token: response.token,
    id: response.id,
  };

  return result;
}

export function transformToAuthLoginRequest(input: AuthLoginInput): AuthLoginRequest {
  const result: AuthLoginRequest = {
    username_email: input.usernameEmail,
    password: input.password,
  };

  return result;
}

export interface AuthRegisterOutput {
  isFreelancer: boolean;
  isConnectedBank: boolean;
  profileImageUrl?: string;
  username: string;
  name: string;
  token: string;
  id: string;
}

export interface AuthRegisterInput {
  email: string;
  username: string;
  name: string;
  phoneNumber: string;
  password: string;
}

export function transformToAuthRegisterOutput(response: AuthRegisterResponse): AuthRegisterOutput {
  const result: AuthRegisterOutput = {
    isFreelancer: response.is_freelancer,
    isConnectedBank: response.is_connected_bank,
    profileImageUrl: response.profile_image_url || '',
    username: response.username,
    name: response.name,
    token: response.token,
    id: response.id,
  };

  return result;
}

export function transformToAuthRegisterRequest(input: AuthRegisterInput): AuthRegisterRequest {
  const result: AuthRegisterRequest = {
    email: input.email,
    username: input.username,
    name: input.name,
    phone_number: input.phoneNumber,
    password: input.password,
  };

  return result;
}

export interface AuthRegisterFreelancerInput {
  cv?: File;
  portfolio?: File;
  educationHistory?: {
    degree: string;
    major: string;
    university: string;
    country: string;
    graduationYear: string;
  }[];
  skills?: string[];
  description: string;
}
