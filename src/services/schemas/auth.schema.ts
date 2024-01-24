export interface AuthLoginResponse {
  is_freelancer: boolean;
  is_connected_bank: boolean;
  profile_image_url?: string;
  username: string;
  name: string;
  token: string;
}

export interface AuthLoginRequest {
  email_username: string;
  password: string;
}

export interface AuthRegisterResponse {
  is_freelancer: boolean;
  is_connected_bank: boolean;
  profile_image_url?: string;
  username: string;
  name: string;
  token: string;
}

export interface AuthRegisterRequest {
  email: string;
  username: string;
  name: string;
  phone_number: string;
  password: string;
}
