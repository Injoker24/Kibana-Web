import { AuthRegisterFreelancerInput } from 'models';

export interface AuthLoginResponse {
  is_freelancer: boolean;
  is_connected_bank: boolean;
  profile_image_url?: string;
  username: string;
  name: string;
  token: string;
  id: string;
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
  id: string;
}

export interface AuthRegisterRequest {
  email: string;
  username: string;
  name: string;
  phone_number: string;
  password: string;
}

export interface AuthRegisterFreelancerRequest {
  cv?: File;
  portfolio?: File;
  education_history?: {
    degree: string;
    major: string;
    university: string;
    country: string;
    graduation_year: string;
  }[];
  skills?: string[];
  description: string;
}

export function transformToAuthRegisterFreelancerRequest(
  input: AuthRegisterFreelancerInput,
): AuthRegisterFreelancerRequest {
  const result: AuthRegisterFreelancerRequest = {
    cv: input.cv,
    portfolio: input.portfolio,
    education_history: input.educationHistory?.map((t) => {
      return {
        degree: t.degree,
        major: t.major,
        university: t.university,
        country: t.country,
        graduation_year: t.graduationYear,
      };
    }),
    skills: input.skills,
    description: input.description,
  };

  return result;
}
