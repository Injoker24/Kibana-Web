import { PaymentStatus } from "enums";

/**
  * Note:
  * 1 = Success,
  * 2 = Error
  */
export const Mock_QrisPayment_CheckPaymentStatus_1_Success = {
    "error_schema": {
        "error_code": "X-Y-ZZZ",
        "fatal_error_flag": false,
        "message": "Sukses"
    },
    "output_schema": {
        "status": PaymentStatus.Success
    }
}