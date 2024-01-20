export interface AccountActivationV2RequestDetailResponse {
  phone_number: string;
  expiry_date: string;
}

export interface AccountActivationV2GenerateOTPRequest {
  request_id: string;
  verification_code: string;
}

export interface AccountActivationV2VerifyOTPRequest {
  request_id: string;
  verification_code: string;
  date_of_birth: string;
  otp_code: string;
}

export interface AccountActivationV2VerifyOTPResponse {
  account_registered: boolean;
}

export interface PINEncryptV2PreparationResponse {
  exponent: string;
  modulus: string;
  random_number: string;
  expires_in_second: string;
  session_id: string;
}

export interface AccountActivationV2ExistingUserRequest {
  request_id: string;
  verification_code: string;
  date_of_birth: string;
  offset_payload: {
    encrypted_pin: string;
    pkcs: string;
    session_id: string;
  };
}

export interface AccountActivationV2ExistingUserResponse {
  redirect_url: string;
}

export interface AccountActivationV2NewUserRequest {
  request_id: string;
  verification_code: string;
  customer: {
    name: string;
    date_of_birth: string;
    email_address: string;
  };
  offset_payload: {
    encrypted_pin: string;
    pkcs: string;
    session_id: string;
  };
}

export interface AccountActivationV2NewUserResponse {
  redirect_url: string;
}

export interface AccountActivationV2InquiryRiplayResponse {
  // tnc_document: string;
  riplay_document: string;
}
