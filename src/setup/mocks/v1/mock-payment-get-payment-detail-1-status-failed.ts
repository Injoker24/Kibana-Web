import { PaymentStatus } from "enums";

/**
  * Note:
  * 1 = Success,
  * 2 = Error
  */
export const Mock_Payment_GetPaymentDetail_1_Status_Failed = {
    "error_schema": {
        "error_code": "X-Y-ZZZ",
        "fatal_error_flag": false,
        "message": "Sukses"
    },
    "output_schema": {
        "amount": 265000,
        "merchant_name": "Kopi Kenangan",
        "remaining_time": 1000,
        "transaction_date": 1594721163000,
        "transaction_id": "1234123",
        "phone_number": "081234567890",
        "status": PaymentStatus.Failed
    }
}