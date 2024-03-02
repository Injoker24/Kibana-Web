import { TransactionInquiryDetailClientTaskResponse } from 'services/schemas';

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
