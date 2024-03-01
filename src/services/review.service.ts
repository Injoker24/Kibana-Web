import { ReviewReviewFreelancerInput, ReviewReviewServiceInput } from 'models';

import {
  ApiResponse,
  transformToReviewReviewFreelancerRequest,
  transformToReviewReviewServiceRequest,
} from 'services/schemas';

import { axiosInstance } from 'setup';

const ReviewService = {
  reviewService: async (data: ReviewReviewServiceInput): Promise<{}> => {
    const requestData = transformToReviewReviewServiceRequest(data);
    const response = await axiosInstance.post<ApiResponse<{}>>(`/review/service`, requestData);

    return response.data.output_schema;
  },

  reviewFreelancer: async (data: ReviewReviewFreelancerInput): Promise<{}> => {
    const requestData = transformToReviewReviewFreelancerRequest(data);
    const response = await axiosInstance.post<ApiResponse<{}>>(`/review/freelancer`, requestData);

    return response.data.output_schema;
  },
};

export default ReviewService;
