import {
    ApiResponse,
    PaymentTransaction,
    ExecutePaymentRequest,
    ExecutePaymentResponse
} from 'models';
import { PaymentStatus } from 'enums';

const PaymentService = {

    getPaymentDetail:
        async (paymentId: string)
            : Promise<ApiResponse<PaymentTransaction>> => {
            console.log(`Function: 'PaymentService.getPaymentDetail()'`, { paymentId });

            // return Promise.reject({
            //     status: 500,
            //     data: {
            //         error_schema: {
            //             fatal_error_flag: true,
            //             // message: error.message
            //             message: 'Gangguan sistem. Ulangi beberapa saat lagi.'
            //         }
            //     }
            // });

            return new Promise<ApiResponse<PaymentTransaction>>(
                resolve => setTimeout(() => {
                    resolve({
                        error_schema: {
                            error_code: 'X-Y-ZZZ',
                            fatal_error_flag: false,
                            message: 'Sukses'
                        },
                        output_schema: {
                            amount: 265000,
                            merchant_name: 'Kopi Kenangan',
                            remaining_time: 1000,
                            transaction_date: 1594721163000,
                            transaction_id: '1234123',
                            phone_number: '081234567890',
                            status: PaymentStatus.Unprocessed
                            // status: PaymentStatus.Success
                        }
                    })
                }, 1000));
        },

    executePayment:
        async (paymentId: string, data: ExecutePaymentRequest) => {
            console.log(`Function: 'PaymentService.executePayment()'`, { paymentId, data });

            // return Promise.reject({
            //     status: 500,
            //     data: {
            //         error_schema: {
            //             fatal_error_flag: false,
            //             // message: error.message
            //             message: 'Gangguan sistem. Ulangi beberapa saat lagi.'
            //         }
            //     }
            // });

            // return Promise.reject({
            //     status: 400,
            //     data: {
            //         error_schema: {
            //             error_code: "ESB-10-476",
            //             message: "PIN salah",
            //             http_code: 400,
            //             fatal_error_flag: false
            //         }
            //     }
            // });

            // return Promise.reject({
            //     status: 500,
            //     data: {
            //         error_schema: {
            //             error_code: 'ESB-10-497',
            //             message: 'Transaksi sedang diproses',
            //             http_code: 500,
            //             fatal_error_flag: false
            //         }
            //     }
            // });

            return new Promise<ApiResponse<ExecutePaymentResponse>>(
                resolve => setTimeout(() => {
                    resolve({
                        error_schema: {
                            error_code: 'X-Y-ZZZ',
                            fatal_error_flag: false,
                            message: 'Sukses'
                        },
                        output_schema: {
                            status: 'Success'
                        }
                    })
                }, 1000));
        }
};

export default PaymentService;