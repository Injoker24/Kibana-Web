import {
  TransactionAskReturnInput,
  TransactionAskRevisionInput,
  TransactionCallAdminInput,
  TransactionCancelReturnInput,
  TransactionCompleteInput,
  TransactionManageCancellationInput,
  TransactionSendAdditionalFileInput,
  TransactionSendMessageInput,
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
