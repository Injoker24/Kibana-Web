import { PaymentStatus, QRISTipAmountType, QRISTipType, QRISType } from "enums";

/**
  * Note:
  * 1 = Success,
  * 2 = Error
  */
export const Mock_QrisPayment_GetPaymentDetail_1_Dynamic_Tip_10K = {
    "error_schema": {
        "error_code": "X-Y-ZZZ",
        "fatal_error_flag": false,
        "message": "Sukses"
    },
    "output_schema": {
        "amount": 150000,
        "copart_name": 'Sakuku',
        "merchant_name": 'Kopi Kenangan',
        "transaction_date": 1594721163000,
        "transaction_id": '1234123',
        "remaining_time": 300,
        "qr_type": QRISType.Dynamic,
        "phone_number": '081234567890',
        "tip": {
            "type": QRISTipType.Mandatory,
            "amount_type": QRISTipAmountType.Absolute,
            "amount": 10000
        },
        "status": PaymentStatus.Unprocessed
    }
}