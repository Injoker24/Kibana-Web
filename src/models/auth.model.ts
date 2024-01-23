import { AuthLoginRequest, AuthLoginResponse } from 'services/schemas';

export interface AuthLoginOutput {
  isFreelancer: boolean;
  isConnectedBank: boolean;
  profileImageUrl: string;
  username: string;
  name: string;
  token: string;
}

export interface AuthLoginInput {
  emailUsername: string;
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
  };

  return result;
}

export function transformToAuthLoginRequest(input: AuthLoginInput): AuthLoginRequest {
  const result: AuthLoginRequest = {
    email_username: input.emailUsername,
    password: input.password,
  };

  return result;
}
