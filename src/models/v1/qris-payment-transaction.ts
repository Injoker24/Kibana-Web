import {
    PaymentStatus,
    QRISType,
    QRISTipType,
    QRISTipAmountType
} from "enums";

export interface QRISPaymentTransaction {
    merchant_name: string,
    copart_name: string,
    transaction_id: string,
    transaction_date: string | number,
    qr_type: QRISType,
    phone_number: string,
    amount: number, // should be > 0 when type is 'dynamic'
    remaining_time: number,
    tip?: QRISPaymentTransactionTip,
    status: PaymentStatus;
}

export interface QRISPaymentTransactionTip {
    type: QRISTipType, // mandatory-tipping might be considered as a service charge
    amount_type: QRISTipAmountType,

    amount: number // should be > 0 when type is 'mandatory'
}

//#region Execute
export interface ExecuteQRISPaymentRequest {
    session_id: string;
    encoding: string;
    random_number: string;
    epin: string;

    amount: number;
    tip_amount?: number;
}

export interface ExecuteQRISPaymentResponse {
    status: string;
}
//#endregion

//#region Check Status
export interface CheckPaymentStatusResponse {
    status: PaymentStatus;
}
//#endregion