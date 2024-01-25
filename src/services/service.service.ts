import { ServiceInquiryCategoryOutput, transformToServiceInquiryCategoryOutput } from 'models';
import { ApiResponse, ServiceInquiryCategoryResponse } from 'services/schemas';

import { axiosInstance } from 'setup';

const ServiceService = {
  inquiryCategory: async (): Promise<ServiceInquiryCategoryOutput> => {
    const response = await axiosInstance.get<ApiResponse<ServiceInquiryCategoryResponse>>(
      `/service/sub-category`,
    );

    return transformToServiceInquiryCategoryOutput(response.data.output_schema);
  },
};

export default ServiceService;
