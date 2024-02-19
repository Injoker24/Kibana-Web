import {
  AccountEditBankDetailInput,
  AccountEditProfileInput,
  AccountEditSkillInput,
  AccountInquiryBankDetailOutput,
  AccountInquiryCVUrlOutput,
  AccountInquiryClientReviewOutput,
  AccountInquiryDescriptionOutput,
  AccountInquiryEducationHistoryOutput,
  AccountInquiryMyProfileOutput,
  AccountInquiryOtherProfileOutput,
  AccountInquiryOwnedServiceOutput,
  AccountInquiryOwnedTaskOutput,
  AccountInquiryPortfolioUrlOutput,
  AccountInquiryReviewHistoryOutput,
  AccountInquirySkillOutput,
  transformToAccountInquiryBankDetailOutput,
  transformToAccountInquiryCVUrlOutput,
  transformToAccountInquiryClientReviewOutput,
  transformToAccountInquiryDescriptionOutput,
  transformToAccountInquiryEducationHistoryOutput,
  transformToAccountInquiryMyProfileOutput,
  transformToAccountInquiryOtherProfileOutput,
  transformToAccountInquiryOwnedServiceOutput,
  transformToAccountInquiryOwnedTaskOutput,
  transformToAccountInquiryPortfolioUrlOutput,
  transformToAccountInquiryReviewHistoryOutput,
  transformToAccountInquirySkillOutput,
} from 'models';

import {
  AccountInquiryBankDetailResponse,
  AccountInquiryCVUrlResponse,
  AccountInquiryClientReviewResponse,
  AccountInquiryDescriptionResponse,
  AccountInquiryEducationHistoryResponse,
  AccountInquiryMyProfileResponse,
  AccountInquiryOtherProfileResponse,
  AccountInquiryOwnedServiceResponse,
  AccountInquiryOwnedTaskResponse,
  AccountInquiryPortfolioUrlResponse,
  AccountInquiryReviewHistoryResponse,
  AccountInquirySkillResponse,
  ApiResponse,
  transformToAccountEditBankDetailRequest,
  transformToAccountEditProfileRequest,
  transformToAccountEditSkillRequest,
} from 'services/schemas';

import { axiosInstance } from 'setup';

const AccountService = {
  inquiryOtherProfile: async (userId: string): Promise<AccountInquiryOtherProfileOutput> => {
    const response = await axiosInstance.get<ApiResponse<AccountInquiryOtherProfileResponse>>(
      `/account/profile/${userId}`,
    );

    return transformToAccountInquiryOtherProfileOutput(response.data.output_schema);
  },

  inquiryOwnedTask: async (userId: string): Promise<AccountInquiryOwnedTaskOutput> => {
    const response = await axiosInstance.get<ApiResponse<AccountInquiryOwnedTaskResponse>>(
      `/account/tasks/${userId}`,
    );

    return transformToAccountInquiryOwnedTaskOutput(response.data.output_schema);
  },

  inquiryClientReview: async (userId: string): Promise<AccountInquiryClientReviewOutput> => {
    const response = await axiosInstance.get<ApiResponse<AccountInquiryClientReviewResponse>>(
      `/account/reviews/${userId}`,
    );

    return transformToAccountInquiryClientReviewOutput(response.data.output_schema);
  },

  inquiryDescription: async (userId: string): Promise<AccountInquiryDescriptionOutput> => {
    const response = await axiosInstance.get<ApiResponse<AccountInquiryDescriptionResponse>>(
      `/account/description/${userId}`,
    );

    return transformToAccountInquiryDescriptionOutput(response.data.output_schema);
  },

  inquiryEducationHistory: async (
    userId: string,
  ): Promise<AccountInquiryEducationHistoryOutput> => {
    const response = await axiosInstance.get<ApiResponse<AccountInquiryEducationHistoryResponse>>(
      `/account/educations/${userId}`,
    );

    return transformToAccountInquiryEducationHistoryOutput(response.data.output_schema);
  },

  inquirySkill: async (userId: string): Promise<AccountInquirySkillOutput> => {
    const response = await axiosInstance.get<ApiResponse<AccountInquirySkillResponse>>(
      `/account/skills/${userId}`,
    );

    return transformToAccountInquirySkillOutput(response.data.output_schema);
  },

  inquiryCV: async (userId: string): Promise<AccountInquiryCVUrlOutput> => {
    const response = await axiosInstance.get<ApiResponse<AccountInquiryCVUrlResponse>>(
      `/account/cv/${userId}`,
    );

    return transformToAccountInquiryCVUrlOutput(response.data.output_schema);
  },

  inquiryPortfolio: async (userId: string): Promise<AccountInquiryPortfolioUrlOutput> => {
    const response = await axiosInstance.get<ApiResponse<AccountInquiryPortfolioUrlResponse>>(
      `/account/portfolio/${userId}`,
    );

    return transformToAccountInquiryPortfolioUrlOutput(response.data.output_schema);
  },

  inquiryOwnedService: async (userId: string): Promise<AccountInquiryOwnedServiceOutput> => {
    const response = await axiosInstance.get<ApiResponse<AccountInquiryOwnedServiceResponse>>(
      `/account/services/${userId}`,
    );

    return transformToAccountInquiryOwnedServiceOutput(response.data.output_schema);
  },

  inquiryMyProfile: async (): Promise<AccountInquiryMyProfileOutput> => {
    const response = await axiosInstance.get<ApiResponse<AccountInquiryMyProfileResponse>>(
      `/account/my/profile`,
    );

    return transformToAccountInquiryMyProfileOutput(response.data.output_schema);
  },

  inquiryBankDetail: async (): Promise<AccountInquiryBankDetailOutput> => {
    const response = await axiosInstance.get<ApiResponse<AccountInquiryBankDetailResponse>>(
      `/account/bank-detail`,
    );

    return transformToAccountInquiryBankDetailOutput(response.data.output_schema);
  },

  editProfile: async (data: AccountEditProfileInput): Promise<{}> => {
    const requestData = transformToAccountEditProfileRequest(data);

    let formData = new FormData();
    if (requestData.profile_image) {
      formData.append('profile_image', requestData.profile_image);
    }

    const blob = new Blob([JSON.stringify(requestData)], {
      type: 'application/json',
    });
    formData.append('data', blob);

    const response = await axiosInstance.post<ApiResponse<{}>>(`/account/edit/profile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.output_schema;
  },

  editBankDetail: async (data: AccountEditBankDetailInput): Promise<{}> => {
    const requestData = transformToAccountEditBankDetailRequest(data);
    const response = await axiosInstance.post<ApiResponse<{}>>(
      `/account/edit/bank-detail`,
      requestData,
    );

    return response.data.output_schema;
  },

  inquiryReviewHistory: async (userId: string): Promise<AccountInquiryReviewHistoryOutput> => {
    const response = await axiosInstance.get<ApiResponse<AccountInquiryReviewHistoryResponse>>(
      `/account/project/history/${userId}`,
    );

    return transformToAccountInquiryReviewHistoryOutput(response.data.output_schema);
  },

  editSkill: async (data: AccountEditSkillInput): Promise<{}> => {
    const requestData = transformToAccountEditSkillRequest(data);
    const response = await axiosInstance.post<ApiResponse<{}>>(`/account/edit/skills`, requestData);

    return response.data.output_schema;
  },
};

export default AccountService;
