
import {
    ApiResponse,
    AccountActivationRequestDetail,
    AccountActivationGenerateOTPRequest,
    AccountActivationGenerateOTPResponse,
    AccountActivationVerifyOTPRequest,
    AccountActivationVerifyOTPResponse,
    AccountActivationCreateNewUserRequest,
    AccountActivationCreateNewUserResponse,
    AccountActivationExistingUserRequest,
    AccountActivationExistingUserResponse,
    AccountActivationSubmitTncAgreementRequest
} from 'models';

import { axiosInstance } from 'setup';

const AccountActivationService = {

    getRequestDetail:
        async (requestId: string)
            : Promise<ApiResponse<AccountActivationRequestDetail>> => {
            const response = await axiosInstance.get(
                `/sakuku-cobrand/registration/${requestId}`
            );

            return response.data;
        },

    generateOTP:
        async (requestId: string, data: AccountActivationGenerateOTPRequest)
            : Promise<ApiResponse<AccountActivationGenerateOTPResponse>> => {
            const response = await axiosInstance.post(
                `/sakuku-cobrand/registration/${requestId}/otp/generate`,
                data
            );

            return response.data;
        },

    verifyOTP:
        async (requestId: string, data: AccountActivationVerifyOTPRequest)
            : Promise<ApiResponse<AccountActivationVerifyOTPResponse>> => {

            // return new Promise<ApiResponse<AccountActivationVerifyOTPResponse>>(
            //     resolve => setTimeout(() => {
            //         resolve({
            //             error_schema: {
            //                 error_code: 'X-Y-ZZZ',
            //                 fatal_error_flag: false,
            //                 message: 'Sukses'
            //             },
            //             output_schema: {
            //                 otp_status: 'BERHASIL',
            //                 is_registered: true,
            //                 chaining_id: 'CHAINING_DUMMY'
            //             }
            //         })
            //     }, 1000));

            const response = await axiosInstance.post(
                `/sakuku-cobrand/registration/${requestId}/otp/verify`,
                data
            );

            return response.data;
        },

    createNewUser:
        async (requestId: string, data: AccountActivationCreateNewUserRequest)
            : Promise<ApiResponse<AccountActivationCreateNewUserResponse>> => {
            const response = await axiosInstance.post(
                `/sakuku-cobrand/registration/${requestId}/user/new`,
                data
            );

            return response.data;
        },

    activateExistingUser:
        async (requestId: string, data: AccountActivationExistingUserRequest)
            : Promise<ApiResponse<AccountActivationExistingUserResponse>> => {
            const response = await axiosInstance.post(
                `/sakuku-cobrand/registration/${requestId}/user/existing`,
                data
            );

            return response.data;
        },

    submitTncAgreement:
        async (data: AccountActivationSubmitTncAgreementRequest)
            : Promise<ApiResponse<{}>> => {

            const response = await axiosInstance.post(
                `/sakuku-cobrand/registration/tnc`,
                data
            );
            return response.data;
        }
};

export default AccountActivationService;