import { PaymentStatus } from "enums";

export interface PaymentTransaction {
    merchant_name: string,
    transaction_id: string,
    transaction_date: string | number,
    phone_number: string,
    amount: number;
    remaining_time: number;
    status: PaymentStatus
}

//#region Execute
export interface ExecutePaymentRequest {
    session_id: string;
    encoding: string;
    random_number: string;
    epin: string;
}
export interface ExecutePaymentResponse {
    status: string;
}
//#endregion