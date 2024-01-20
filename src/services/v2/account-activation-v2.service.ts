import {
  transformToAccountActivationV2RequestDetailOutput,
  AccountActivationV2RequestDetailOutput,
  AccountActivationV2VerifyOTPOutput,
  transformToAccountActivationV2VerifyOTPOutput,
  transformToAccountActivationV2ExistingUserOutput,
  AccountActivationV2ExistingUserOutput,
  AccountActivationV2NewUserOutput,
  transformToAccountActivationV2NewUserOutput,
  AccountActivationV2VerifyOTPInput,
  transformToAccountActivationV2VerifyOTPRequest,
  AccountActivationV2GenerateOTPInput,
  transformToAccountActivationV2GenerateOTPRequest,
  transformToAccountActivationV2ExistingUserRequest,
  transformToAccountActivationV2NewUserRequest,
  transformToPINEncryptV2PreparationOutput,
  NewUserDataWrapper,
  AccountActivationV2InquiryRiplayOutput,
  transformToAccountActivationV2InquiryRiplayOutput,
} from 'models';

import {
  AccountActivationV2ExistingUserResponse,
  AccountActivationV2InquiryRiplayResponse,
  AccountActivationV2NewUserResponse,
  AccountActivationV2RequestDetailResponse,
  AccountActivationV2VerifyOTPResponse,
  ApiResponseV2,
  PINEncryptV2PreparationResponse,
} from 'services/schemas';

import { axiosInstanceV2 } from 'setup';

const AccountActivationV2Service = {
  getRequestDetail: async (
    requestId: string,
    verificationCode: string | null,
  ): Promise<AccountActivationV2RequestDetailOutput> => {
    const response = await axiosInstanceV2.get<
      ApiResponseV2<AccountActivationV2RequestDetailResponse>
    >(`/sakuku-cobrand/v2/registration/${requestId}`, {
      params: {
        'verification-code': verificationCode,
      },
    });
    return transformToAccountActivationV2RequestDetailOutput(response.data.output_schema);
  },

  generateOTP: async (data: AccountActivationV2GenerateOTPInput): Promise<{}> => {
    const requestData = transformToAccountActivationV2GenerateOTPRequest(data);
    const response = await axiosInstanceV2.post<ApiResponseV2<{}>>(
      `/sakuku-cobrand/v2/registration/otp/generate`,
      requestData,
    );

    return response.data.output_schema;
  },

  verifyOTP: async (
    data: AccountActivationV2VerifyOTPInput,
  ): Promise<AccountActivationV2VerifyOTPOutput> => {
    const requestData = transformToAccountActivationV2VerifyOTPRequest(data);
    const response = await axiosInstanceV2.post<
      ApiResponseV2<AccountActivationV2VerifyOTPResponse>
    >(`/sakuku-cobrand/v2/registration/otp/verify`, requestData);

    return transformToAccountActivationV2VerifyOTPOutput(response.data.output_schema);
  },

  activateExistingUser: async (
    requestId: string,
    verificationCode: string,
    birthDate: string,
    pin: string,
  ): Promise<AccountActivationV2ExistingUserOutput> => {
    const pinEncryptV2PreparationResponse = await axiosInstanceV2.get<
      ApiResponseV2<PINEncryptV2PreparationResponse>
    >(`/sakuku-cobrand/v2/registration/encrypt/prepare`, {
      params: {
        'request-id': requestId,
        'verification-code': verificationCode,
      },
    });

    const encryptPINData = transformToPINEncryptV2PreparationOutput(
      pinEncryptV2PreparationResponse.data.output_schema,
      pin,
    );

    const accountActivationV2ExistingUserRequestData =
      transformToAccountActivationV2ExistingUserRequest({
        requestId,
        verificationCode,
        birthDate,
        offsetPayload: {
          encryptedPin: encryptPINData.encryptedPIN,
          encoding: encryptPINData.encoding,
          sessionId: encryptPINData.sessionId,
        },
      });

    const response = await axiosInstanceV2.put<
      ApiResponseV2<AccountActivationV2ExistingUserResponse>
    >(
      `/sakuku-cobrand/v2/registration/customer/verify`,
      accountActivationV2ExistingUserRequestData,
    );

    return transformToAccountActivationV2ExistingUserOutput(response.data.output_schema);
  },

  createNewUser: async (
    requestId: string,
    verificationCode: string,
    formData: NewUserDataWrapper,
    birthDate: string,
    pin: string,
  ): Promise<AccountActivationV2NewUserOutput> => {
    const pinEncryptV2PreparationResponse = await axiosInstanceV2.get<
      ApiResponseV2<PINEncryptV2PreparationResponse>
    >(`/sakuku-cobrand/v2/registration/encrypt/prepare`, {
      params: {
        'request-id': requestId,
        'verification-code': verificationCode,
      },
    });

    const encryptPINData = transformToPINEncryptV2PreparationOutput(
      pinEncryptV2PreparationResponse.data.output_schema,
      pin,
    );

    const accountActivationV2NewUserRequestData = transformToAccountActivationV2NewUserRequest({
      requestId,
      verificationCode,
      customer: {
        name: formData.name,
        birthDate: birthDate,
        email: formData.email,
      },
      offsetPayload: {
        encryptedPin: encryptPINData.encryptedPIN,
        encoding: encryptPINData.encoding,
        sessionId: encryptPINData.sessionId,
      },
    });

    const response = await axiosInstanceV2.post<ApiResponseV2<AccountActivationV2NewUserResponse>>(
      `/sakuku-cobrand/v2/registration/customer/create`,
      accountActivationV2NewUserRequestData,
    );

    return transformToAccountActivationV2NewUserOutput(response.data.output_schema);
  },

  inquiryRiplay: async (
    requestId: string,
    verificationCode: string,
  ): Promise<AccountActivationV2InquiryRiplayOutput> => {
    const response = await axiosInstanceV2.get<
      ApiResponseV2<AccountActivationV2InquiryRiplayResponse>
    >(`/sakuku-cobrand/v2/registration/document`, {
      params: {
        'request-id': requestId,
        'verification-code': verificationCode,
      },
    });

    return transformToAccountActivationV2InquiryRiplayOutput(response.data.output_schema);
  },
};

export default AccountActivationV2Service;
