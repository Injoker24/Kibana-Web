import { ReviewReviewFreelancerInput, ReviewReviewServiceInput } from 'models';

export interface ReviewReviewServiceRequest {
  transaction_id: string;
  star: number;
  description?: string;
}

export function transformToReviewReviewServiceRequest(
  input: ReviewReviewServiceInput,
): ReviewReviewServiceRequest {
  const result: ReviewReviewServiceRequest = {
    transaction_id: input.transactionId,
    star: input.star,
    description: input.description,
  };

  return result;
}

export interface ReviewReviewFreelancerRequest {
  transaction_id: string;
  star: number;
  description?: string;
}

export function transformToReviewReviewFreelancerRequest(
  input: ReviewReviewFreelancerInput,
): ReviewReviewFreelancerRequest {
  const result: ReviewReviewFreelancerRequest = {
    transaction_id: input.transactionId,
    star: input.star,
    description: input.description,
  };

  return result;
}
