import {
  TransactionInquiryClientActivityResponse,
  TransactionInquiryClientInvoiceResponse,
  TransactionInquiryDetailClientTaskResponse,
} from 'services/schemas';

export interface TransactionInquiryDetailClientTaskOutput {
  transactionDetail: {
    id: string;
    taskDetail: {
      id: string;
      name: string;
      tags: string[];
      dueDate: string;
      difficulty: string;
      price: string;
    };
    status: string;
    deliveryDate?: string;
    hasReturned: boolean;
    chosenFreelancer: {
      id: string;
      name: string;
      profileImageUrl?: string;
      description: string;
    };
    isReviewed?: boolean;
    review?: {
      amount: number;
      description?: string;
    };
  };
}

export function transformToTransactionInquiryDetailClientTaskOutput(
  response: TransactionInquiryDetailClientTaskResponse,
): TransactionInquiryDetailClientTaskOutput {
  const result: TransactionInquiryDetailClientTaskOutput = {
    transactionDetail: {
      id: response.transaction_detail.id,
      taskDetail: {
        id: response.transaction_detail.task_detail.id,
        name: response.transaction_detail.task_detail.name,
        tags: response.transaction_detail.task_detail.tags,
        dueDate: response.transaction_detail.task_detail.due_date,
        difficulty: response.transaction_detail.task_detail.difficulty,
        price: response.transaction_detail.task_detail.price,
      },
      status: response.transaction_detail.status,
      deliveryDate: response.transaction_detail.delivery_date,
      hasReturned: response.transaction_detail.has_returned,
      chosenFreelancer: {
        id: response.transaction_detail.chosen_freelancer.id,
        name: response.transaction_detail.chosen_freelancer.name,
        profileImageUrl: response.transaction_detail.chosen_freelancer.profile_image_url,
        description: response.transaction_detail.chosen_freelancer.description,
      },
      isReviewed: response.transaction_detail.is_reviewed,
      review: response.transaction_detail.review
        ? {
            amount: response.transaction_detail.review.amount,
            description: response.transaction_detail.review.description,
          }
        : undefined,
    },
  };

  return result;
}

export interface TransactionInquiryClientInvoiceOutput {
  refNo: string;
  clientName: string;
  freelancerName: string;
  paymentDate: string;
  task: {
    name: string;
    price: string;
    duration?: number;
    revisionCount?: number;
    additionalData?: {
      title: string;
    }[];
  };
  fee: {
    percentage: number;
    amount: number;
  };
  totalPrice: number;
}

export function transformToTransactionInquiryClientInvoiceOutput(
  response: TransactionInquiryClientInvoiceResponse,
): TransactionInquiryClientInvoiceOutput {
  const result: TransactionInquiryClientInvoiceOutput = {
    refNo: response.ref_no,
    clientName: response.client_name,
    freelancerName: response.freelancer_name,
    paymentDate: response.payment_date,
    task: {
      name: response.task.name,
      price: response.task.price,
      duration: response.task.duration,
      revisionCount: response.task.revision_count,
      additionalData: response.task.additional_data?.map((t) => {
        return {
          title: t.title,
        };
      }),
    },
    fee: {
      percentage: response.fee.percentage,
      amount: response.fee.amount,
    },
    totalPrice: response.total_price,
  };

  return result;
}

export interface TransactionInquiryClientActivityOutput {
  activity: {
    timestamp: string;
    code: string;
    title: string;
    description?: string;
    files?: {
      id: string;
      fileName: string;
    }[];
    responseDeadline?: string;
    deadlineExtension?: string;
    buttons?: {
      code: string;
      name: string;
    }[];
  }[];
}

export function transformToTransactionInquiryClientActivityOutput(
  response: TransactionInquiryClientActivityResponse,
): TransactionInquiryClientActivityOutput {
  const result: TransactionInquiryClientActivityOutput = {
    activity: response.activity.map((t) => {
      return {
        timestamp: t.timestamp,
        code: t.code,
        title: t.title,
        description: t.description,
        files: t.files?.map((file) => {
          return {
            id: file.id,
            fileName: file.file_name,
          };
        }),
        responseDeadline: t.response_deadline,
        deadlineExtension: t.deadline_extension,
        buttons: t.buttons?.map((button) => {
          return {
            code: button.code,
            name: button.name,
          };
        }),
      };
    }),
  };

  return result;
}
