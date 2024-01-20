import {
    ApiResponse,
    QRISPaymentTransaction,
    ExecuteQRISPaymentRequest,
    ExecuteQRISPaymentResponse,
    CheckPaymentStatusResponse
} from 'models';

import {
    QRISType,
    QRISTipType,
    QRISTipAmountType,
    PaymentStatus
} from 'enums';

const QRISPaymentService = {


    /**
     * Ada 8 skenario yang mungkin bisa di achieve dari model ini.
     * 1. QR Static (Nominal = 0)
     *    a. Tip Mandatory (Nominal > 0), dengan UOM 'absolute' / 'percentage'
     *    b. Tip Optional (Nominal = 0), dengan UOM 'absolute' / 'percentage'
     * 2. QR Dynamic (Nominal > 0)
     *    a. Tip Mandatory (Nominal > 0), dengan UOM 'absolute' / 'percentage'
     *    b. Tip Optional (Nominal = 0), dengan UOM 'absolute' / 'percentage'
     */
    getPaymentDetail:
        async (paymentId: string)
            : Promise<ApiResponse<QRISPaymentTransaction>> => {
            console.log(`Function: 'QRISPaymentService.getPaymentDetail()'`, { paymentId });

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

            return new Promise<ApiResponse<QRISPaymentTransaction>>(
                resolve => setTimeout(() => {
                    resolve({
                        error_schema: {
                            error_code: 'X-Y-ZZZ',
                            fatal_error_flag: false,
                            message: 'Sukses'
                        },

                        //#region Dynamic
                        // // QR Dynamic tanpa tip
                        // output_schema: {
                        //     amount: 150000,
                        //     merchant_name: 'Kopi Kenangan',
                        //     copart_name: 'Sakuku',
                        //     transaction_date: 1594721163000,
                        //     transaction_id: '1234123',
                        //     remaining_time: 300,
                        //     qr_type: QRISType.Dynamic,
                        //     phone_number: '081234567890',
                        //     status: PaymentStatus.Unprocessed
                        // }

                        // // QR Dynamic, tip opsional
                        // output_schema: {
                        //     amount: 150000,
                        //     copart_name: 'Sakuku',
                        //     merchant_name: 'Kopi Kenangan',
                        //     transaction_date: 1594721163000,
                        //     transaction_id: '1234123',
                        //     remaining_time: 300,
                        //     qr_type: QRISType.Dynamic,
                        //     phone_number: '081234567890',
                        //     tip: {
                        //         type: QRISTipType.Optional,
                        //         amount_type: QRISTipAmountType.Absolute,
                        //         amount: 0
                        //     },
                        //     status: PaymentStatus.Unprocessed
                        // }

                        // // QR Dynamic, tip fix 10%
                        // output_schema: {
                        //     amount: 4545455,
                        //     copart_name: 'Sakuku',
                        //     merchant_name: 'Kopi Kenangan',
                        //     transaction_date: 1594721163000,
                        //     transaction_id: '1234123',
                        //     remaining_time: 300,
                        //     qr_type: QRISType.Dynamic,
                        //     phone_number: '081234567890',
                        //     tip: {
                        //         type: QRISTipType.Mandatory,
                        //         amount_type: QRISTipAmountType.Percentage,
                        //         amount: 10
                        //     },
                        //     status: PaymentStatus.Unprocessed
                        // }

                        // // QR Dynamic, tip fix 10K
                        // output_schema: {
                        //     amount: 150000,
                        //     copart_name: 'Sakuku',
                        //     merchant_name: 'Kopi Kenangan',
                        //     transaction_date: 1594721163000,
                        //     transaction_id: '1234123',
                        //     remaining_time: 300,
                        //     qr_type: QRISType.Dynamic,
                        //     phone_number: '081234567890',
                        //     tip: {
                        //         type: QRISTipType.Mandatory,
                        //         amount_type: QRISTipAmountType.Absolute,
                        //         amount: 10000
                        //     },
                        //     status: PaymentStatus.Unprocessed
                        // }
                        //#endregion

                        //#region Static
                        // // QR Static tanpa tip
                        // output_schema: {
                        //     amount: 0,
                        //     copart_name: 'Sakuku',
                        //     merchant_name: 'Kopi Kenangan',
                        //     transaction_date: 1594721163000,
                        //     transaction_id: '1234123',
                        //     remaining_time: 300,
                        //     qr_type: QRISType.Static,
                        //     phone_number: '081234567890',
                        //     status: PaymentStatus.Unprocessed
                        // }

                        // // QR Static, tip opsional (absolute)
                        // output_schema: {
                        //     amount: 0,
                        //     copart_name: 'Sakuku',
                        //     merchant_name: 'Kopi Kenangan',
                        //     transaction_date: 1594721163000,
                        //     transaction_id: '1234123',
                        //     remaining_time: 300,
                        //     qr_type: QRISType.Static,
                        //     phone_number: '081234567890',
                        //     tip: {
                        //         type: QRISTipType.Optional,
                        //         amount_type: QRISTipAmountType.Absolute,
                        //         amount: 0
                        //     },
                        //     status: PaymentStatus.Unprocessed
                        // }

                        // // QR Static, tip opsional (percentage)
                        // output_schema: {
                        //     amount: 0,
                        //     copart_name: 'Sakuku',
                        //     merchant_name: 'Kopi Kenangan',
                        //     transaction_date: 1594721163000,
                        //     transaction_id: '1234123',
                        //     remaining_time: 300,
                        //     qr_type: QRISType.Static,
                        //     phone_number: '081234567890',
                        //     tip: {
                        //         type: QRISTipType.Optional,
                        //         amount_type: QRISTipAmountType.Percentage,
                        //         amount: 0
                        //     },
                        //     status: PaymentStatus.Unprocessed
                        // }

                        // // QR Static, tip fix 10%
                        // output_schema: {
                        //     amount: 0,
                        //     copart_name: 'Sakuku',
                        //     merchant_name: 'Kopi Kenangan',
                        //     transaction_date: 1594721163000,
                        //     transaction_id: '1234123',
                        //     remaining_time: 300,
                        //     qr_type: QRISType.Static,
                        //     phone_number: '081234567890',
                        //     tip: {
                        //         type: QRISTipType.Mandatory,
                        //         amount_type: QRISTipAmountType.Percentage,
                        //         amount: 10
                        //     },
                        //     status: PaymentStatus.Unprocessed
                        // }

                        // // QR Dynamic, tip fix 10K
                        output_schema: {
                            amount: 0,
                            copart_name: 'Sakuku',
                            merchant_name: 'Kopi Kenangan',
                            transaction_date: 1594721163000,
                            transaction_id: '1234123',
                            remaining_time: 300,
                            qr_type: QRISType.Static,
                            phone_number: '081234567890',
                            tip: {
                                type: QRISTipType.Mandatory,
                                amount_type: QRISTipAmountType.Absolute,
                                amount: 10000
                            },
                            status: PaymentStatus.Unprocessed
                        }
                        //#endregion
                    })
                }, 1000));
        },

    executePayment:
        async (paymentId: string, data: ExecuteQRISPaymentRequest) => {
            console.log(`Function: 'QRISPaymentService.executePayment()'`, { paymentId, data });


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
            //     status: 504,
            //     data: {
            //         error_schema: {
            //             fatal_error_flag: false,
            //             // message: error.message
            //             message: 'Transaksimu pending bos.'
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
            //             error_code: ErrorCode.PaymentAmountLimitExceeded,
            //             fatal_error_flag: false,
            //             // message: error.message
            //             message: 'Kelewatan. Update nominal pembayaran lagi'
            //         }
            //     }
            // });

            // return Promise.reject({
            //     status: 500,
            //     data: {
            //         error_schema: {
            //             error_code: ErrorCode.ClientConnectionTimeout,
            //             fatal_error_flag: false,
            //             // message: error.message
            //             message: 'Cek status'
            //         }
            //     }
            // });

            return new Promise<ApiResponse<ExecuteQRISPaymentResponse>>(
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
        },

    checkPaymentStatus:
        async (paymentId: string, transactionDate: string) => {
            console.log(`Function: 'QRISPaymentService.checkPaymentStatus()'`, { paymentId, transactionDate });
            return new Promise<ApiResponse<CheckPaymentStatusResponse>>(
                resolve => setTimeout(() => {
                    resolve({
                        error_schema: {
                            error_code: 'X-Y-ZZZ',
                            fatal_error_flag: false,
                            message: 'Sukses'
                        },
                        output_schema: {
                            status: PaymentStatus.Failed
                        }
                    })
                }, 1000));
        }
};

export default QRISPaymentService;