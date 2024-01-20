import { ErrorCode } from "enums";

/**
  * Note:
  * 1 = Success,
  * 2 = Error
  */
export const Mock_AccountActivation_VerifyOTP_2_System_Error = {
    "error_schema": {
        "error_code": ErrorCode.ShouldResendOTP,
        "fatal_error_flag": false,
        "message": 'SYSTEM ERROR. PLEASE RESEND'
    }
}