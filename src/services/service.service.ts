import {
  ServiceInquiryCategoryOutput,
  ServiceInquiryDetailSubCategoryOutput,
  ServiceInquiryNewServiceOutput,
  transformToServiceInquiryCategoryOutput,
  transformToServiceInquiryDetailSubCategoryOutput,
  transformToServiceInquiryNewServiceOutput,
} from 'models';
import {
  ApiResponse,
  ServiceInquiryCategoryResponse,
  ServiceInquiryDetailSubCategoryResponse,
  ServiceInquiryNewServiceResponse,
} from 'services/schemas';

import { axiosInstance } from 'setup';

const ServiceService = {
  inquiryCategory: async (): Promise<ServiceInquiryCategoryOutput> => {
    const response = await axiosInstance.get<ApiResponse<ServiceInquiryCategoryResponse>>(
      `/service/category`,
    );

    return transformToServiceInquiryCategoryOutput(response.data.output_schema);
  },

  inquiryNewService: async (categoryId?: string): Promise<ServiceInquiryNewServiceOutput> => {
    let path: string;
    if (categoryId) {
      path = `/service/new/${categoryId}`;
    } else {
      path = `/service/new`;
    }

    const response = await axiosInstance.get<ApiResponse<ServiceInquiryNewServiceResponse>>(path);

    return transformToServiceInquiryNewServiceOutput(response.data.output_schema);
  },

  inquiryDetailSubCategory: async (
    categoryId: string,
  ): Promise<ServiceInquiryDetailSubCategoryOutput> => {
    const response = await axiosInstance.get<ApiResponse<ServiceInquiryDetailSubCategoryResponse>>(
      `/service/category/${categoryId}/detail`,
    );

    return transformToServiceInquiryDetailSubCategoryOutput(response.data.output_schema);
  },
};

export default ServiceService;
