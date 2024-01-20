import dayjs from 'dayjs';
import {
  AccountActivationV2ExistingUserRequest,
  AccountActivationV2ExistingUserResponse,
  AccountActivationV2GenerateOTPRequest,
  AccountActivationV2InquiryRiplayResponse,
  AccountActivationV2NewUserRequest,
  AccountActivationV2NewUserResponse,
  AccountActivationV2RequestDetailResponse,
  AccountActivationV2VerifyOTPRequest,
  AccountActivationV2VerifyOTPResponse,
  PINEncryptV2PreparationResponse,
} from 'services/schemas';

declare global {
  interface Window {
    initialisePublicKeyData: any;
    OBM_EncryptPassword: any;
    OBM_GetEncodingParameter: any;
    OBM_GetEncryptedPassword: any;
  }
}
export interface AccountActivationV2RequestDetailOutput {
  phoneNumber: string;
  remainingTime: number;
}

export function transformToAccountActivationV2RequestDetailOutput(
  response: AccountActivationV2RequestDetailResponse,
): AccountActivationV2RequestDetailOutput {
  const currentDate = dayjs();
  const expiryDate = dayjs(parseInt(response.expiry_date));

  const result: AccountActivationV2RequestDetailOutput = {
    phoneNumber: response.phone_number,
    remainingTime: expiryDate.diff(currentDate, 'second'),
  };
  return result;
}

export interface AccountActivationV2GenerateOTPInput {
  requestId: string;
  verificationCode: string;
}

export function transformToAccountActivationV2GenerateOTPRequest(
  response: AccountActivationV2GenerateOTPInput,
): AccountActivationV2GenerateOTPRequest {
  const result: AccountActivationV2GenerateOTPRequest = {
    request_id: response.requestId,
    verification_code: response.verificationCode,
  };
  return result;
}

export interface AccountActivationV2VerifyOTPInput {
  requestId: string;
  verificationCode: string;
  otpCode: string;
  birthDate: string;
}

export function transformToAccountActivationV2VerifyOTPRequest(
  response: AccountActivationV2VerifyOTPInput,
): AccountActivationV2VerifyOTPRequest {
  const result: AccountActivationV2VerifyOTPRequest = {
    request_id: response.requestId,
    verification_code: response.verificationCode,
    otp_code: response.otpCode,
    date_of_birth: response.birthDate,
  };
  return result;
}

export interface AccountActivationV2VerifyOTPOutput {
  isRegistered: boolean;
}

export function transformToAccountActivationV2VerifyOTPOutput(
  response: AccountActivationV2VerifyOTPResponse,
): AccountActivationV2VerifyOTPOutput {
  const result: AccountActivationV2VerifyOTPOutput = {
    isRegistered: response.account_registered,
  };
  return result;
}

export interface PINEncryptV2PreparationOutput {
  encoding: string;
  encryptedPIN: string;
  sessionId: string;
}

export function transformToPINEncryptV2PreparationOutput(
  response: PINEncryptV2PreparationResponse,
  pin: string,
): PINEncryptV2PreparationOutput {
  // intialize public key
  window.initialisePublicKeyData(response.modulus, response.exponent);
  // encrypt the password
  window.OBM_EncryptPassword(pin, response.random_number);

  // fetch the generated value
  const PString = window.OBM_GetEncodingParameter();
  const CString = window.OBM_GetEncryptedPassword();

  const result: PINEncryptV2PreparationOutput = {
    encoding: PString,
    encryptedPIN: CString,
    sessionId: response.session_id,
  };
  return result;
}

export interface AccountActivationV2ExistingUserInput {
  requestId: string;
  verificationCode: string;
  birthDate: string;
  offsetPayload: {
    encryptedPin: string;
    encoding: string;
    sessionId: string;
  };
}

export function transformToAccountActivationV2ExistingUserRequest(
  response: AccountActivationV2ExistingUserInput,
): AccountActivationV2ExistingUserRequest {
  const result: AccountActivationV2ExistingUserRequest = {
    request_id: response.requestId,
    verification_code: response.verificationCode,
    date_of_birth: response.birthDate,
    offset_payload: {
      encrypted_pin: response.offsetPayload.encryptedPin,
      pkcs: response.offsetPayload.encoding,
      session_id: response.offsetPayload.sessionId,
    },
  };
  return result;
}

export interface AccountActivationV2ExistingUserOutput {
  redirectUrl: string;
}

export function transformToAccountActivationV2ExistingUserOutput(
  response: AccountActivationV2ExistingUserResponse,
): AccountActivationV2ExistingUserOutput {
  const result: AccountActivationV2ExistingUserOutput = {
    redirectUrl: response.redirect_url,
  };
  return result;
}

export interface AccountActivationV2NewUserInput {
  requestId: string;
  verificationCode: string;
  customer: {
    name: string;
    birthDate: string;
    email: string;
  };
  offsetPayload: {
    encryptedPin: string;
    encoding: string;
    sessionId: string;
  };
}

export function transformToAccountActivationV2NewUserRequest(
  response: AccountActivationV2NewUserInput,
): AccountActivationV2NewUserRequest {
  const result: AccountActivationV2NewUserRequest = {
    request_id: response.requestId,
    verification_code: response.verificationCode,
    customer: {
      name: response.customer.name,
      date_of_birth: response.customer.birthDate,
      email_address: response.customer.email,
    },
    offset_payload: {
      encrypted_pin: response.offsetPayload.encryptedPin,
      pkcs: response.offsetPayload.encoding,
      session_id: response.offsetPayload.sessionId,
    },
  };
  return result;
}

export interface AccountActivationV2NewUserOutput {
  redirectUrl: string;
}

export function transformToAccountActivationV2NewUserOutput(
  response: AccountActivationV2NewUserResponse,
): AccountActivationV2NewUserOutput {
  const result: AccountActivationV2NewUserOutput = {
    redirectUrl: response.redirect_url,
  };
  return result;
}

export interface AccountActivationV2InquiryRiplayOutput {
  // tncDocument: string;
  riplayDocument: string;
}

export function transformToAccountActivationV2InquiryRiplayOutput(
  response: AccountActivationV2InquiryRiplayResponse,
): AccountActivationV2InquiryRiplayOutput {
  const result: AccountActivationV2InquiryRiplayOutput = {
    // tncDocument: response.tnc_document,
    riplayDocument: response.riplay_document,
  };
  return result;
}

export interface ModalErrorWrapperV2 {
  message: string;
  shouldExit: boolean;
  onClose?: () => void;
}

export interface VerificationDataWrapper {
  birthDate: string;
  isRegistered: boolean;
}

export interface BirthDateDataWrapper {
  value: Date;
  formattedValue: string;
}

export interface NewUserDataWrapper {
  name: string;
  email: string;
}
