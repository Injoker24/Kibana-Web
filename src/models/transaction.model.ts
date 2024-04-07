import {
  TransactionInquiryClientActivityResponse,
  TransactionInquiryClientInvoiceResponse,
  TransactionInquiryDetailClientServiceResponse,
  TransactionInquiryDetailClientTaskResponse,
  TransactionInquiryDetailFreelancerServiceResponse,
  TransactionInquiryDetailFreelancerTaskResponse,
  TransactionInquiryFreelancerActivityResponse,
  TransactionInquiryFreelancerInvoiceResponse,
  TransactionSendFeedbackResponse,
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
  project: {
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
    project: {
      name: response.project.name,
      price: response.project.price,
      duration: response.project.duration,
      revisionCount: response.project.revision_count,
      additionalData: response.project.additional_data?.map((t) => {
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

export interface TransactionAskReturnInput {
  transactionId: string;
  message: string;
}

export interface TransactionAskRevisionInput {
  transactionId: string;
  message: string;
}

export interface TransactionCompleteInput {
  transactionId: string;
}

export interface TransactionCancelReturnInput {
  transactionId: string;
}

export interface TransactionCallAdminInput {
  transactionId: string;
}

export interface TransactionManageCancellationInput {
  transactionId: string;
  type: string;
}

export interface TransactionSendMessageInput {
  transactionId: string;
  message: string;
}

export interface TransactionSendAdditionalFileInput {
  additionalFile?: File;
  transactionId: string;
}

export interface TransactionInquiryDetailClientServiceOutput {
  transactionDetail: {
    id: string;
    serviceDetail: {
      id: string;
      name: string;
      tags: string[];
      dueDate: string;
      price: string;
    };
    status: string;
    deliveryDate?: string;
    hasReturned: boolean;
    freelancer: {
      id: string;
      name: string;
      profileImageUrl?: string;
      description: string;
    };
    ratingAmount: number;
    averageRating: number;
    isReviewed?: boolean;
    review?: {
      amount: number;
      description?: string;
    };
  };
}

export function transformToTransactionInquiryDetailClientServiceOutput(
  response: TransactionInquiryDetailClientServiceResponse,
): TransactionInquiryDetailClientServiceOutput {
  const result: TransactionInquiryDetailClientServiceOutput = {
    transactionDetail: {
      id: response.transaction_detail.id,
      serviceDetail: {
        id: response.transaction_detail.service_detail.id,
        name: response.transaction_detail.service_detail.name,
        tags: response.transaction_detail.service_detail.tags,
        dueDate: response.transaction_detail.service_detail.due_date,
        price: response.transaction_detail.service_detail.price,
      },
      status: response.transaction_detail.status,
      deliveryDate: response.transaction_detail.delivery_date,
      hasReturned: response.transaction_detail.has_returned,
      freelancer: {
        id: response.transaction_detail.freelancer.id,
        name: response.transaction_detail.freelancer.name,
        profileImageUrl: response.transaction_detail.freelancer.profile_image_url,
        description: response.transaction_detail.freelancer.description,
      },
      averageRating: response.transaction_detail.average_rating,
      ratingAmount: response.transaction_detail.rating_amount,
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

export interface TransactionInquiryFreelancerActivityOutput {
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

export function transformToTransactionInquiryFreelancerActivityOutput(
  response: TransactionInquiryFreelancerActivityResponse,
): TransactionInquiryFreelancerActivityOutput {
  const result: TransactionInquiryFreelancerActivityOutput = {
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

export interface TransactionInquiryFreelancerInvoiceOutput {
  refNo: string;
  clientName: string;
  freelancerName: string;
  paymentDate: string;
  project: {
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
  bankDetail: {
    bankName: string;
    beneficiaryName: string;
    accountNumber: string;
  };
}

export function transformToTransactionInquiryFreelancerInvoiceOutput(
  response: TransactionInquiryFreelancerInvoiceResponse,
): TransactionInquiryFreelancerInvoiceOutput {
  const result: TransactionInquiryFreelancerInvoiceOutput = {
    refNo: response.ref_no,
    clientName: response.client_name,
    freelancerName: response.freelancer_name,
    paymentDate: response.payment_date,
    project: {
      name: response.project.name,
      price: response.project.price,
      duration: response.project.duration,
      revisionCount: response.project.revision_count,
      additionalData: response.project.additional_data?.map((t) => {
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
    bankDetail: {
      bankName: response.bank_detail.bank_name,
      beneficiaryName: response.bank_detail.beneficiary_name,
      accountNumber: response.bank_detail.account_number,
    },
  };

  return result;
}

export interface TransactionInquiryDetailFreelancerServiceOutput {
  transactionDetail: {
    id: string;
    serviceDetail: {
      id: string;
      name: string;
      tags: string[];
      dueDate: string;
      price: string;
    };
    status: string;
    deliveryDate?: string;
    hasCancelled: boolean;
    client: {
      id: string;
      name: string;
      profileImageUrl?: string;
    };
    isReviewed?: boolean;
    review?: {
      amount: number;
      description?: string;
    };
  };
}

export function transformToTransactionInquiryDetailFreelancerServiceOutput(
  response: TransactionInquiryDetailFreelancerServiceResponse,
): TransactionInquiryDetailFreelancerServiceOutput {
  const result: TransactionInquiryDetailFreelancerServiceOutput = {
    transactionDetail: {
      id: response.transaction_detail.id,
      serviceDetail: {
        id: response.transaction_detail.service_detail.id,
        name: response.transaction_detail.service_detail.name,
        tags: response.transaction_detail.service_detail.tags,
        dueDate: response.transaction_detail.service_detail.due_date,
        price: response.transaction_detail.service_detail.price,
      },
      status: response.transaction_detail.status,
      deliveryDate: response.transaction_detail.delivery_date,
      hasCancelled: response.transaction_detail.has_cancelled,
      client: {
        id: response.transaction_detail.client.id,
        name: response.transaction_detail.client.name,
        profileImageUrl: response.transaction_detail.client.profile_image_url,
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

export interface TransactionAskCancelInput {
  transactionId: string;
  message: string;
}

export interface TransactionCancelCancelInput {
  transactionId: string;
}

export interface TransactionManageReturnInput {
  transactionId: string;
  type: string;
}

export interface TransactionSendResultInput {
  result: File[];
  transactionId: string;
  description: string;
}

export interface TransactionInquiryDetailFreelancerTaskOutput {
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
    hasCancelled: boolean;
    client: {
      id: string;
      name: string;
      profileImageUrl?: string;
    };
    isReviewed?: boolean;
    review?: {
      amount: number;
      description?: string;
    };
  };
}

export function transformToTransactionInquiryDetailFreelancerTaskOutput(
  response: TransactionInquiryDetailFreelancerTaskResponse,
): TransactionInquiryDetailFreelancerTaskOutput {
  const result: TransactionInquiryDetailFreelancerTaskOutput = {
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
      hasCancelled: response.transaction_detail.has_cancelled,
      client: {
        id: response.transaction_detail.client.id,
        name: response.transaction_detail.client.name,
        profileImageUrl: response.transaction_detail.client.profile_image_url,
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

export interface TransactionSendFeedbackOutput {
  transactionId: string;
}

export function transformToTransactionSendFeedbackOutput(
  response: TransactionSendFeedbackResponse,
): TransactionSendFeedbackOutput {
  const result: TransactionSendFeedbackOutput = {
    transactionId: response.transaction_id,
  };

  return result;
}

export interface TransactionSendRequirementInput {
  supportingFile: File;
  transactionId: string;
  description: string;
}
