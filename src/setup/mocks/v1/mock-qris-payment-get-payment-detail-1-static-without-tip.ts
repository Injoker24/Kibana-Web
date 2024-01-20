import { PaymentStatus, QRISType } from "enums";

/**
  * Note:
  * 1 = Success,
  * 2 = Error
  */
export const Mock_QrisPayment_GetPaymentDetail_1_Static_Without_Tip = {
    "error_schema": {
        "error_code": "X-Y-ZZZ",
        "fatal_error_flag": false,
        "message": "Sukses"
    },
    "output_schema": {
        "amount": 0,
        "copart_name": 'Sakuku',
        "merchant_name": 'Kopi Kenangan',
        "transaction_date": 1594721163000,
        "transaction_id": '1234123',
        "remaining_time": 300,
        "qr_type": QRISType.Static,
        "phone_number": '081234567890',
        "status": PaymentStatus.Unprocessed
    }
}