import { ErrorCode } from "enums";

/**
  * Note:
  * 1 = Success,
  * 2 = Error
  */
export const Mock_AccountActivation_VerifyOTP_2_Invalid_Birth_Date = {
    "error_schema": {
        "error_code": ErrorCode.InvalidBirthDate,
        "fatal_error_flag": false,
        "message": 'INVALID BIRTH DATE'
    }
}