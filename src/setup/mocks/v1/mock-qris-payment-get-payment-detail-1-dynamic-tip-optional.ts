import { PaymentStatus, QRISTipAmountType, QRISTipType, QRISType } from "enums";

/**
  * Note:
  * 1 = Success,
  * 2 = Error
  */
export const Mock_QrisPayment_GetPaymentDetail_1_Dynamic_Tip_Optional = {
    "error_schema": {
        "error_code": "X-Y-ZZZ",
        "fatal_error_flag": false,
        "message": "Sukses"
    },
    "output_schema": {
        "amount": 150000,
        "merchant_name": 'Kopi Kenangan',
        "copart_name": 'Sakuku',
        "transaction_date": 1594721163000,
        "transaction_id": '1234123',
        "remaining_time": 300,
        "qr_type": QRISType.Dynamic,
        "phone_number": '081234567890',
        "tip": {
            "type": QRISTipType.Optional,
            "amount_type": QRISTipAmountType.Absolute,
            "amount": 0
        },
        "status": PaymentStatus.Unprocessed
    }
}