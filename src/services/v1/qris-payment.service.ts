import {
    ApiResponse,
    QRISPaymentTransaction,
    ExecuteQRISPaymentRequest,
    CheckPaymentStatusResponse
} from 'models';

import { axiosInstance } from 'setup';

const QRISPaymentService = {

    getPaymentDetail:
        async (paymentId: string)
            : Promise<ApiResponse<QRISPaymentTransaction>> => {
            const response = await axiosInstance.get<ApiResponse<QRISPaymentTransaction>>(
                `/sakuku-cobrand/qris-payment/${paymentId}`
            );

            return response.data;
        },

    executePayment:
        async (paymentId: string, data: ExecuteQRISPaymentRequest) => {
            const response = await axiosInstance.post<ApiResponse<ExecuteQRISPaymentRequest>>(
                `/sakuku-cobrand/qris-payment/${paymentId}`,
                data
            );

            return response.data;
        },

    /** Note: transactionDate should be in YYYYMMDD format */
    checkPaymentStatus:
        async (paymentId: string, transactionDate: string) => {
            const response = await axiosInstance.get<ApiResponse<CheckPaymentStatusResponse>>(
                `/sakuku-cobrand/qris-payment/${paymentId}/status?transaction-date=${transactionDate}`
            );

            return response.data;
        }

};

export default QRISPaymentService;