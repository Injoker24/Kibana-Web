import {
  TransactionAskReturnInput,
  TransactionAskRevisionInput,
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
  transformToTransactionAskReturnRequest,
  transformToTransactionAskRevisionRequest,
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

  askReturn: async (data: TransactionAskReturnInput): Promise<{}> => {
    const requestData = transformToTransactionAskReturnRequest(data);
    const response = await axiosInstance.post<ApiResponse<{}>>(
      `/transaction/ask-return`,
      requestData,
    );

    return response.data.output_schema;
  },

  askRevision: async (data: TransactionAskRevisionInput): Promise<{}> => {
    const requestData = transformToTransactionAskRevisionRequest(data);
    const response = await axiosInstance.post<ApiResponse<{}>>(
      `/transaction/ask-revision`,
      requestData,
    );

    return response.data.output_schema;
  },
};

export default TransactionService;
