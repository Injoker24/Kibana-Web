import {
  TransactionInquiryClientActivityOutput,
  TransactionInquiryClientInvoiceOutput,
  TransactionInquiryDetailClientTaskOutput,
  transformToTransactionInquiryClientActivityOutput,
  transformToTransactionInquiryClientInvoiceOutput,
  transformToTransactionInquiryDetailClientTaskOutput,
} from 'models';
import { axiosInstance } from 'setup';
import {
  ApiResponse,
  TransactionInquiryClientActivityResponse,
  TransactionInquiryClientInvoiceResponse,
  TransactionInquiryDetailClientTaskResponse,
} from './schemas';

const TransactionService = {
  inquiryClientTaskTransactionDetail: async (
    transactionId: string,
  ): Promise<TransactionInquiryDetailClientTaskOutput> => {
    const response = await axiosInstance.get<
      ApiResponse<TransactionInquiryDetailClientTaskResponse>
    >(`/transaction/task/client/${transactionId}`);

    return transformToTransactionInquiryDetailClientTaskOutput(response.data.output_schema);
  },

  inquiryClientInvoice: async (
    transactionId: string,
  ): Promise<TransactionInquiryClientInvoiceOutput> => {
    const response = await axiosInstance.get<ApiResponse<TransactionInquiryClientInvoiceResponse>>(
      `/transaction/invoice/${transactionId}`,
    );

    return transformToTransactionInquiryClientInvoiceOutput(response.data.output_schema);
  },

  inquiryClientActivity: async (
    transactionId: string,
  ): Promise<TransactionInquiryClientActivityOutput> => {
    const response = await axiosInstance.get<ApiResponse<TransactionInquiryClientActivityResponse>>(
      `/transaction/${transactionId}/client/activity`,
    );

    return transformToTransactionInquiryClientActivityOutput(response.data.output_schema);
  },
};

export default TransactionService;
