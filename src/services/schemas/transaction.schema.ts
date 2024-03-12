import {
  TransactionAskCancelInput,
  TransactionAskReturnInput,
  TransactionAskRevisionInput,
  TransactionCallAdminInput,
  TransactionCancelCancelInput,
  TransactionCancelReturnInput,
  TransactionCompleteInput,
  TransactionManageCancellationInput,
  TransactionManageReturnInput,
  TransactionSendAdditionalFileInput,
  TransactionSendMessageInput,
  TransactionSendResultInput,
} from 'models';

export interface TransactionInquiryDetailClientTaskResponse {
  transaction_detail: {
    id: string;
    task_detail: {
      id: string;
      name: string;
      tags: string[];
      due_date: string;
      difficulty: string;
      price: string;
    };
    status: string;
    delivery_date?: string;
    has_returned: boolean;
    chosen_freelancer: {
      id: string;
      name: string;
      profile_image_url?: string;
      description: string;
    };
    is_reviewed?: boolean;
    review?: {
      amount: number;
      description?: string;
    };
  };
}

export interface TransactionInquiryClientInvoiceResponse {
  ref_no: string;
  client_name: string;
  freelancer_name: string;
  payment_date: string;
  project: {
    name: string;
    price: string;
    duration?: number;
    revision_count?: number;
    additional_data?: {
      title: string;
    }[];
  };
  fee: {
    percentage: number;
    amount: number;
  };
  total_price: number;
}

export interface TransactionInquiryClientActivityResponse {
  activity: {
    timestamp: string;
    code: string;
    title: string;
    description?: string;
    files?: {
      id: string;
      file_name: string;
    }[];
    response_deadline?: string;
    deadline_extension?: string;
    buttons?: {
      code: string;
      name: string;
    }[];
  }[];
}

export interface TransactionAskReturnRequest {
  transaction_id: string;
  message: string;
}

export function transformToTransactionAskReturnRequest(
  input: TransactionAskReturnInput,
): TransactionAskReturnRequest {
  const result: TransactionAskReturnRequest = {
    transaction_id: input.transactionId,
    message: input.message,
  };

  return result;
}

export interface TransactionAskRevisionRequest {
  transaction_id: string;
  message: string;
}

export function transformToTransactionAskRevisionRequest(
  input: TransactionAskRevisionInput,
): TransactionAskRevisionRequest {
  const result: TransactionAskRevisionRequest = {
    transaction_id: input.transactionId,
    message: input.message,
  };

  return result;
}

export interface TransactionCompleteRequest {
  transaction_id: string;
}

export function transformToTransactionCompleteRequest(
  input: TransactionCompleteInput,
): TransactionCompleteRequest {
  const result: TransactionCompleteRequest = {
    transaction_id: input.transactionId,
  };

  return result;
}

export interface TransactionCancelReturnRequest {
  transaction_id: string;
}

export function transformToTransactionCancelReturnRequest(
  input: TransactionCancelReturnInput,
): TransactionCancelReturnRequest {
  const result: TransactionCancelReturnRequest = {
    transaction_id: input.transactionId,
  };

  return result;
}

export interface TransactionCallAdminRequest {
  transaction_id: string;
}

export function transformToTransactionCallAdminRequest(
  input: TransactionCallAdminInput,
): TransactionCallAdminRequest {
  const result: TransactionCallAdminRequest = {
    transaction_id: input.transactionId,
  };

  return result;
}

export interface TransactionManageCancellationRequest {
  transaction_id: string;
  type: string;
}

export function transformToTransactionManageCancellationRequest(
  input: TransactionManageCancellationInput,
): TransactionManageCancellationRequest {
  const result: TransactionManageCancellationRequest = {
    transaction_id: input.transactionId,
    type: input.type,
  };

  return result;
}

export interface TransactionSendMessageRequest {
  transaction_id: string;
  message: string;
}

export function transformToTransactionSendMessageRequest(
  input: TransactionSendMessageInput,
): TransactionSendMessageRequest {
  const result: TransactionSendMessageRequest = {
    transaction_id: input.transactionId,
    message: input.message,
  };

  return result;
}

export interface TransactionSendAdditionalFileRequest {
  additional_file?: File;
  transaction_id: string;
}

export function transformToTransactionSendAdditionalFileRequest(
  input: TransactionSendAdditionalFileInput,
): TransactionSendAdditionalFileRequest {
  const result: TransactionSendAdditionalFileRequest = {
    additional_file: input.additionalFile,
    transaction_id: input.transactionId,
  };

  return result;
}

export interface TransactionInquiryDetailClientServiceResponse {
  transaction_detail: {
    id: string;
    service_detail: {
      id: string;
      name: string;
      tags: string[];
      due_date: string;
      price: string;
    };
    status: string;
    delivery_date?: string;
    has_returned: boolean;
    freelancer: {
      id: string;
      name: string;
      profile_image_url?: string;
      description: string;
    };
    rating_amount: number;
    average_rating: number;
    is_reviewed?: boolean;
    review?: {
      amount: number;
      description?: string;
    };
  };
}

export interface TransactionInquiryFreelancerActivityResponse {
  activity: {
    timestamp: string;
    code: string;
    title: string;
    description?: string;
    files?: {
      id: string;
      file_name: string;
    }[];
    response_deadline?: string;
    deadline_extension?: string;
    buttons?: {
      code: string;
      name: string;
    }[];
  }[];
}

export interface TransactionInquiryFreelancerInvoiceResponse {
  ref_no: string;
  client_name: string;
  freelancer_name: string;
  payment_date: string;
  project: {
    name: string;
    price: string;
    duration?: number;
    revision_count?: number;
    additional_data?: {
      title: string;
    }[];
  };
  fee: {
    percentage: number;
    amount: number;
  };
  total_price: number;
  bank_detail: {
    bank_name: string;
    beneficiary_name: string;
    account_number: string;
  };
}

export interface TransactionInquiryDetailFreelancerServiceResponse {
  transaction_detail: {
    id: string;
    service_detail: {
      id: string;
      name: string;
      tags: string[];
      due_date: string;
      price: string;
    };
    status: string;
    delivery_date?: string;
    has_cancelled: boolean;
    client: {
      id: string;
      name: string;
      profile_image_url?: string;
    };
    is_reviewed?: boolean;
    review?: {
      amount: number;
      description?: string;
    };
  };
}

export interface TransactionAskCancelRequest {
  transaction_id: string;
  message: string;
}

export function transformToTransactionAskCancelRequest(
  input: TransactionAskCancelInput,
): TransactionAskCancelRequest {
  const result: TransactionAskCancelRequest = {
    transaction_id: input.transactionId,
    message: input.message,
  };

  return result;
}

export interface TransactionCancelCancelRequest {
  transaction_id: string;
}

export function transformToTransactionCancelCancelRequest(
  input: TransactionCancelCancelInput,
): TransactionCancelCancelRequest {
  const result: TransactionCancelCancelRequest = {
    transaction_id: input.transactionId,
  };

  return result;
}

export interface TransactionManageReturnRequest {
  transaction_id: string;
  type: string;
}

export function transformToTransactionManageReturnRequest(
  input: TransactionManageReturnInput,
): TransactionManageReturnRequest {
  const result: TransactionManageReturnRequest = {
    transaction_id: input.transactionId,
    type: input.type,
  };

  return result;
}

export interface TransactionSendResultRequest {
  result: File[];
  transaction_id: string;
  description: string;
}

export function transformToTransactionSendResultRequest(
  input: TransactionSendResultInput,
): TransactionSendResultRequest {
  const result: TransactionSendResultRequest = {
    result: input.result,
    transaction_id: input.transactionId,
    description: input.description,
  };

  return result;
}

export interface TransactionInquiryDetailFreelancerTaskResponse {
  transaction_detail: {
    id: string;
    task_detail: {
      id: string;
      name: string;
      tags: string[];
      due_date: string;
      difficulty: string;
      price: string;
    };
    status: string;
    delivery_date?: string;
    has_cancelled: boolean;
    client: {
      id: string;
      name: string;
      profile_image_url?: string;
    };
    is_reviewed?: boolean;
    review?: {
      amount: number;
      description?: string;
    };
  };
}
