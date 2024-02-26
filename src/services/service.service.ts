import {
  ServiceInquiryCategoryOutput,
  ServiceInquiryDetailSubCategoryOutput,
  ServiceInquiryNewServiceOutput,
  ServiceInquiryServiceDetailOutput,
  ServiceInquiryServiceHistoryOutput,
  ServiceInquiryServiceListInput,
  ServiceInquiryServiceListOutput,
  transformToServiceInquiryCategoryOutput,
  transformToServiceInquiryDetailSubCategoryOutput,
  transformToServiceInquiryNewServiceOutput,
  transformToServiceInquiryServiceDetailOutput,
  transformToServiceInquiryServiceHistoryOutput,
  transformToServiceInquiryServiceListOutput,
} from 'models';
import {
  ApiResponse,
  ServiceInquiryCategoryResponse,
  ServiceInquiryDetailSubCategoryResponse,
  ServiceInquiryNewServiceResponse,
  ServiceInquiryServiceDetailResponse,
  ServiceInquiryServiceHistoryResponse,
  ServiceInquiryServiceListResponse,
  transformToServiceInquiryServiceListRequest,
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

  inquiryServiceList: async (
    input: ServiceInquiryServiceListInput,
  ): Promise<ServiceInquiryServiceListOutput> => {
    const request = transformToServiceInquiryServiceListRequest(input);
    const response = await axiosInstance.post<ApiResponse<ServiceInquiryServiceListResponse>>(
      `/service/list`,
      request,
    );

    return transformToServiceInquiryServiceListOutput(response.data.output_schema);
  },

  inquiryServiceDetail: async (serviceId: string): Promise<ServiceInquiryServiceDetailOutput> => {
    const response = await axiosInstance.get<ApiResponse<ServiceInquiryServiceDetailResponse>>(
      `/service/detail/${serviceId}`,
    );

    return transformToServiceInquiryServiceDetailOutput(response.data.output_schema);
  },

  inquiryServiceHistory: async (): Promise<ServiceInquiryServiceHistoryOutput> => {
    const response = await axiosInstance.get<ApiResponse<ServiceInquiryServiceHistoryResponse>>(
      `/service/history`,
    );

    return transformToServiceInquiryServiceHistoryOutput(response.data.output_schema);
  },
};

export default ServiceService;
