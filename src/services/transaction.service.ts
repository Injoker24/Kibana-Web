import {
  TransactionAskCancelInput,
  TransactionAskReturnInput,
  TransactionAskRevisionInput,
  TransactionCallAdminInput,
  TransactionCancelCancelInput,
  TransactionCancelReturnInput,
  TransactionCompleteInput,
  TransactionInquiryClientActivityOutput,
  TransactionInquiryClientInvoiceOutput,
  TransactionInquiryDetailClientServiceOutput,
  TransactionInquiryDetailClientTaskOutput,
  TransactionInquiryDetailFreelancerServiceOutput,
  TransactionInquiryDetailFreelancerTaskOutput,
  TransactionInquiryFreelancerActivityOutput,
  TransactionInquiryFreelancerInvoiceOutput,
  TransactionManageCancellationInput,
  TransactionManageReturnInput,
  TransactionSendAdditionalFileInput,
  TransactionSendMessageInput,
  TransactionSendResultInput,
  transformToTransactionInquiryClientActivityOutput,
  transformToTransactionInquiryClientInvoiceOutput,
  transformToTransactionInquiryDetailClientServiceOutput,
  transformToTransactionInquiryDetailClientTaskOutput,
  transformToTransactionInquiryDetailFreelancerServiceOutput,
  transformToTransactionInquiryDetailFreelancerTaskOutput,
  transformToTransactionInquiryFreelancerActivityOutput,
  transformToTransactionInquiryFreelancerInvoiceOutput,
} from 'models';
import { axiosInstance } from 'setup';
import {
  ApiResponse,
  TransactionInquiryClientActivityResponse,
  TransactionInquiryClientInvoiceResponse,
  TransactionInquiryDetailClientServiceResponse,
  TransactionInquiryDetailClientTaskResponse,
  TransactionInquiryDetailFreelancerServiceResponse,
  TransactionInquiryDetailFreelancerTaskResponse,
  TransactionInquiryFreelancerActivityResponse,
  TransactionInquiryFreelancerInvoiceResponse,
  transformToTransactionAskCancelRequest,
  transformToTransactionAskReturnRequest,
  transformToTransactionAskRevisionRequest,
  transformToTransactionCallAdminRequest,
  transformToTransactionCancelCancelRequest,
  transformToTransactionCancelReturnRequest,
  transformToTransactionCompleteRequest,
  transformToTransactionManageCancellationRequest,
  transformToTransactionManageReturnRequest,
  transformToTransactionSendAdditionalFileRequest,
  transformToTransactionSendMessageRequest,
  transformToTransactionSendResultRequest,
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

  complete: async (data: TransactionCompleteInput): Promise<{}> => {
    const requestData = transformToTransactionCompleteRequest(data);
    const response = await axiosInstance.put<ApiResponse<{}>>(`/transaction/complete`, requestData);

    return response.data.output_schema;
  },

  cancelReturn: async (data: TransactionCancelReturnInput): Promise<{}> => {
    const requestData = transformToTransactionCancelReturnRequest(data);
    const response = await axiosInstance.put<ApiResponse<{}>>(
      `/transaction/cancel-return`,
      requestData,
    );

    return response.data.output_schema;
  },

  callAdmin: async (data: TransactionCallAdminInput): Promise<{}> => {
    const requestData = transformToTransactionCallAdminRequest(data);
    const response = await axiosInstance.put<ApiResponse<{}>>(
      `/transaction/call-admin`,
      requestData,
    );

    return response.data.output_schema;
  },

  manageCancellation: async (data: TransactionManageCancellationInput): Promise<{}> => {
    const requestData = transformToTransactionManageCancellationRequest(data);
    const response = await axiosInstance.post<ApiResponse<{}>>(
      `/transaction/manage-cancellation`,
      requestData,
    );

    return response.data.output_schema;
  },

  sendMessage: async (data: TransactionSendMessageInput): Promise<{}> => {
    const requestData = transformToTransactionSendMessageRequest(data);
    const response = await axiosInstance.post<ApiResponse<{}>>(
      `/transaction/send-message`,
      requestData,
    );

    return response.data.output_schema;
  },

  sendAdditionalFile: async (data: TransactionSendAdditionalFileInput): Promise<{}> => {
    const requestData = transformToTransactionSendAdditionalFileRequest(data);

    let formData = new FormData();
    if (requestData.additional_file) {
      formData.append('additional_file', requestData.additional_file);
    }

    const blob = new Blob([JSON.stringify(requestData)], {
      type: 'application/json',
    });
    formData.append('data', blob);

    const response = await axiosInstance.post<ApiResponse<{}>>(`/transaction/send-file`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.output_schema;
  },

  inquiryClientServiceTransactionDetail: async (
    transactionId: string,
  ): Promise<TransactionInquiryDetailClientServiceOutput> => {
    const response = await axiosInstance.get<
      ApiResponse<TransactionInquiryDetailClientServiceResponse>
    >(`/transaction/service/client/${transactionId}`);

    return transformToTransactionInquiryDetailClientServiceOutput(response.data.output_schema);
  },

  inquiryFreelancerServiceTransactionDetail: async (
    transactionId: string,
  ): Promise<TransactionInquiryDetailFreelancerServiceOutput> => {
    const response = await axiosInstance.get<
      ApiResponse<TransactionInquiryDetailFreelancerServiceResponse>
    >(`/transaction/service/freelancer/${transactionId}`);

    return transformToTransactionInquiryDetailFreelancerServiceOutput(response.data.output_schema);
  },

  inquiryFreelancerInvoice: async (
    transactionId: string,
  ): Promise<TransactionInquiryFreelancerInvoiceOutput> => {
    const response = await axiosInstance.get<
      ApiResponse<TransactionInquiryFreelancerInvoiceResponse>
    >(`/transaction/invoice/${transactionId}/completed`);

    return transformToTransactionInquiryFreelancerInvoiceOutput(response.data.output_schema);
  },

  inquiryFreelancerActivity: async (
    transactionId: string,
  ): Promise<TransactionInquiryFreelancerActivityOutput> => {
    const response = await axiosInstance.get<
      ApiResponse<TransactionInquiryFreelancerActivityResponse>
    >(`/transaction/${transactionId}/freelancer/activity`);

    return transformToTransactionInquiryFreelancerActivityOutput(response.data.output_schema);
  },

  askCancel: async (data: TransactionAskCancelInput): Promise<{}> => {
    const requestData = transformToTransactionAskCancelRequest(data);
    const response = await axiosInstance.post<ApiResponse<{}>>(
      `/transaction/ask-cancellation`,
      requestData,
    );

    return response.data.output_schema;
  },

  cancelCancel: async (data: TransactionCancelCancelInput): Promise<{}> => {
    const requestData = transformToTransactionCancelCancelRequest(data);
    const response = await axiosInstance.put<ApiResponse<{}>>(
      `/transaction/cancel-cancellation`,
      requestData,
    );

    return response.data.output_schema;
  },

  manageReturn: async (data: TransactionManageReturnInput): Promise<{}> => {
    const requestData = transformToTransactionManageReturnRequest(data);
    const response = await axiosInstance.post<ApiResponse<{}>>(
      `/transaction/manage-return`,
      requestData,
    );

    return response.data.output_schema;
  },

  sendResult: async (data: TransactionSendResultInput): Promise<{}> => {
    const requestData = transformToTransactionSendResultRequest(data);

    let formData = new FormData();
    if (requestData.result) {
      if (requestData.result.length >= 1) {
        formData.append('result_1', requestData.result[0]);
      }
      if (requestData.result.length >= 2) {
        formData.append('result_2', requestData.result[1]);
      }
      if (requestData.result.length === 3) {
        formData.append('result_3', requestData.result[2]);
      }
    }

    const blob = new Blob([JSON.stringify(requestData)], {
      type: 'application/json',
    });
    formData.append('data', blob);

    const response = await axiosInstance.post<ApiResponse<{}>>(
      `/transaction/send-result`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data.output_schema;
  },

  inquiryFreelancerTaskTransactionDetail: async (
    transactionId: string,
  ): Promise<TransactionInquiryDetailFreelancerTaskOutput> => {
    const response = await axiosInstance.get<
      ApiResponse<TransactionInquiryDetailFreelancerTaskResponse>
    >(`/transaction/task/freelancer/${transactionId}`);

    return transformToTransactionInquiryDetailFreelancerTaskOutput(response.data.output_schema);
  },
};

export default TransactionService;
