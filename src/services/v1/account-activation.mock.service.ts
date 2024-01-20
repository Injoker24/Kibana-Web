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

const AccountActivationService = {
    getRequestDetail:
        async (requestId: string)
            : Promise<ApiResponse<AccountActivationRequestDetail>> => {

            console.log(`Function: 'AccountActivationService.getRequestDetail()'`, { requestId });

            // return Promise.reject({
            //     status: 500,
            //     data: {
            //         error_schema: {
            //             fatal_error_flag: true,
            //             message: 'Error with http status code 500'
            //         }
            //     }
            // });

            return new Promise<ApiResponse<AccountActivationRequestDetail>>(
                resolve => setTimeout(() => {
                    resolve({
                        error_schema: {
                            error_code: 'X-Y-ZZZ',
                            fatal_error_flag: false,
                            message: 'Sukses'
                        },
                        //// If is_deeplink: false
                        // output_schema: {
                        //     merchant_id: '123456',
                        //     merchant_name: 'The Grateful Bread',
                        //     phone_number: '081802866688',
                        //     customer_name: 'Anpanman',
                        //     is_deeplink: false,
                        //     remaining_time: 300
                        // }
                        output_schema: {
                            merchant_id: '123456',
                            merchant_name: 'The Grateful Bread',
                            phone_number: '081802866688',
                            customer_name: 'Anpanman',
                            is_deeplink: false,
                            remaining_time: 300,
                            min_android_version: '176',
                            ios_appstore_id: '965131157'
                        }
                    })
                }, 1000));
        },

    generateOTP:
        async (requestId: string, data: AccountActivationGenerateOTPRequest)
            : Promise<ApiResponse<AccountActivationGenerateOTPResponse>> => {

            console.log(`Function: 'AccountActivationService.generateOTP()'`, { requestId, data });

            return new Promise<ApiResponse<AccountActivationGenerateOTPResponse>>(
                resolve => setTimeout(() => {
                    resolve({
                        error_schema: {
                            error_code: 'X-Y-ZZZ',
                            fatal_error_flag: false,
                            message: 'Sukses'
                        },
                        output_schema: {
                            otp_status: 'SUCCESS'
                        }
                    })
                }, 1000));
        },

    verifyOTP:
        async (requestId: string, data: AccountActivationVerifyOTPRequest)
            : Promise<ApiResponse<AccountActivationVerifyOTPResponse>> => {

            console.log(`Function: 'AccountActivationService.verifyOTP()'`, { requestId, data });

            // return Promise.reject({
            //     status: 400,
            //     data: {
            //         error_schema: {
            //             fatal_error_flag: false,
            //             message: 'INVALID OTP INPUT'
            //         }
            //     }
            // });

            // return Promise.reject({
            //     status: 504,
            //     data: {
            //         error_schema: {
            //             fatal_error_flag: false,
            //             message: 'CONNECTIVITY ERROR'
            //         }
            //     }
            // });

            // return Promise.reject({
            //     status: 400,
            //     data: {
            //         error_schema: {
            //             error_code: ErrorCode.InvalidBirthDate,
            //             fatal_error_flag: false,
            //             message: 'INVALID BIRTH DATE'
            //         }
            //     }
            // });

            // return Promise.reject({
            //     status: 400,
            //     data: {
            //         error_schema: {
            //             error_code: ErrorCode.ShouldResendOTP,
            //             fatal_error_flag: false,
            //             message: 'SYSTEM ERROR. PLEASE RESEND'
            //         }
            //     }
            // });

            // return Promise.reject({
            //     status: 500,
            //     data: {
            //         error_schema: {
            //             fatal_error_flag: true,
            //             message: 'FATAL ERROR'
            //         }
            //     }
            // });

            return new Promise<ApiResponse<AccountActivationVerifyOTPResponse>>(
                resolve => setTimeout(() => {
                    resolve({
                        error_schema: {
                            error_code: 'X-Y-ZZZ',
                            fatal_error_flag: false,
                            message: 'Sukses'
                        },
                        output_schema: {
                            otp_status: 'BERHASIL',
                            is_registered: false,
                            chaining_id: 'CHAINING_DUMMY'
                        }
                    })
                }, 1000));
        },

    createNewUser:
        async (requestId: string, data: AccountActivationCreateNewUserRequest)
            : Promise<ApiResponse<AccountActivationCreateNewUserResponse>> => {

            console.log(`Function: 'AccountActivationService.createNewUser()'`, { requestId, data });

            return new Promise<ApiResponse<AccountActivationCreateNewUserResponse>>(
                resolve => setTimeout(() => {
                    resolve({
                        error_schema: {
                            error_code: 'X-Y-ZZZ',
                            fatal_error_flag: false,
                            message: 'Sukses'
                        },
                        output_schema: {
                            status: 'Success'
                        }
                    })
                }, 1000));
        },

    activateExistingUser:
        async (requestId: string, data: AccountActivationExistingUserRequest)
            : Promise<ApiResponse<AccountActivationExistingUserResponse>> => {

            console.log(`Function: 'AccountActivationService.activateExistingUser()'`, { requestId, data });

            // return Promise.reject({
            //     status: 400,
            //     data: {
            //         error_schema: {
            //             error_code: "ESB-10-476",
            //             message: "PIN salah",
            //             http_code: 400,
            //             fatal_error_flag: false
            //         }
            //     }
            // });

            return new Promise<ApiResponse<AccountActivationExistingUserResponse>>(
                resolve => setTimeout(() => {
                    resolve({
                        error_schema: {
                            error_code: 'X-Y-ZZZ',
                            fatal_error_flag: false,
                            message: 'Sukses'
                        },
                        output_schema: {
                            status: 'Success'
                        }
                    })
                }, 1000));
        },

    submitTncAgreement:
        async (data: AccountActivationSubmitTncAgreementRequest)
            : Promise<ApiResponse<{}>> => {

            console.log(`Function: 'AccountActivationService.submitTncAgreement()'`, { data });

            // return Promise.reject({
            //     status: 500,
            //     data: {
            //         error_schema: {
            //             error_code: "ESB-10-476",
            //             message: "ERROR",
            //             http_code: 500,
            //             fatal_error_flag: false
            //         }
            //     }
            // });

            return new Promise<ApiResponse<{}>>(
                resolve => setTimeout(() => {
                    resolve({
                        error_schema: {
                            error_code: 'X-Y-ZZZ',
                            fatal_error_flag: false,
                            message: 'Sukses'
                        },
                        output_schema: {}
                    })
                }, 1000));
        }

};

export default AccountActivationService;