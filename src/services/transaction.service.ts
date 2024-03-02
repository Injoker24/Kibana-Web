import {
  TransactionInquiryDetailClientTaskOutput,
  transformToTransactionInquiryDetailClientTaskOutput,
} from 'models';
import { axiosInstance } from 'setup';
import { ApiResponse, TransactionInquiryDetailClientTaskResponse } from './schemas';

const TransactionService = {
  inquiryClientTaskTransactionDetail: async (
    transactionId: string,
  ): Promise<TransactionInquiryDetailClientTaskOutput> => {
    const response = await axiosInstance.get<
      ApiResponse<TransactionInquiryDetailClientTaskResponse>
    >(`/transaction/task/client/${transactionId}`);

    return transformToTransactionInquiryDetailClientTaskOutput(response.data.output_schema);
  },
};

export default TransactionService;
