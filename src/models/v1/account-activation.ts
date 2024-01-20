export interface AccountActivationRequestDetail {
    phone_number: string;
    merchant_name: string;
    remaining_time: number;
    merchant_id: string;
    customer_name: string;
    is_deeplink: boolean;
    /** Required if is_deeplink: true */
    min_android_version?: string;
    /** Required if is_deeplink: true */
    ios_appstore_id?: string;
}

//#region Request
export interface AccountActivationGenerateOTPRequest {
    phone_number: string;
    merchant_id: string;
}
//#endregion
//#region Response
export interface AccountActivationGenerateOTPResponse {
    otp_status: string;
}
//#endregion

//#region Request
export interface AccountActivationVerifyOTPRequest {
    phone_number: string;
    /** yyyy-mm-dd format */
    birth_date: string;
    otp_code: string;
    merchant_id: string;
}
//#endregion
//#region Response
export interface AccountActivationVerifyOTPResponse {
    otp_status: string;
    is_registered: boolean;
    chaining_id: string;
}
//#endregion

//#region Request
export interface AccountActivationCreateNewUserRequest {
    session_id: string;
    encoding: string;
    random_number: string;
    epin: string;
    customer_name: string;
    email: string;
    birth_date: string;
    chaining_id: string;
}
//#endregion
//#region Response
export interface AccountActivationCreateNewUserResponse {
    status: string;
}
//#endregion

//#region Request
export interface AccountActivationExistingUserRequest {
    /** yyyy-mm-dd format */
    birth_date: string;
    epin: string;
    encoding: string;
    session_id: string;
    random_number: string;
    chaining_id: string;
}
//#endregion
//#region Response
export interface AccountActivationExistingUserResponse {
    status: string;
}
//#endregion

export interface PINEcnrtypPreparationResponse {
    modulus: string;
    exponent: string;
    random_number: string;
    session_id: string;
    remaining_time: number;
}

//#region Request
export interface AccountActivationSubmitTncAgreementRequest {
    phone_number: string;
    company_code: string;
}
//#endregion
//#region Response

//#endregion