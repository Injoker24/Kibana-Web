import {
    ApiResponse,
    PaymentTransaction,
    ExecutePaymentRequest,
    ExecutePaymentResponse
} from 'models';

import { axiosInstance } from 'setup';

const PaymentService = {

    getPaymentDetail:
        async (paymentId: string)
            : Promise<ApiResponse<PaymentTransaction>> => {
            const response = await axiosInstance.get<ApiResponse<PaymentTransaction>>(
                `/sakuku-cobrand/payment/${paymentId}`
            );

            return response.data;
        },

    executePayment:
        async (paymentId: string, data: ExecutePaymentRequest) => {
            const response = await axiosInstance.post<ApiResponse<ExecutePaymentResponse>>(
                `/sakuku-cobrand/payment/${paymentId}`,
                data
            );

            return response.data;
        }

};

export default PaymentService;