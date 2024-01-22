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
