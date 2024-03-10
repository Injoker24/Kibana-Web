import {
  ServiceInquiryCategoryOutput,
  ServiceInquiryDetailSubCategoryOutput,
  ServiceInquiryNewServiceOutput,
  ServiceInquiryOrdersOutput,
  ServiceInquiryOwnedServiceDetailOutput,
  ServiceInquiryOwnedServiceOutput,
  ServiceInquiryServiceDetailOutput,
  ServiceInquiryServiceHistoryOutput,
  ServiceInquiryServiceListInput,
  ServiceInquiryServiceListOutput,
  transformToServiceInquiryCategoryOutput,
  transformToServiceInquiryDetailSubCategoryOutput,
  transformToServiceInquiryNewServiceOutput,
  transformToServiceInquiryOrdersOutput,
  transformToServiceInquiryOwnedServiceDetailOutput,
  transformToServiceInquiryOwnedServiceOutput,
  transformToServiceInquiryServiceDetailOutput,
  transformToServiceInquiryServiceHistoryOutput,
  transformToServiceInquiryServiceListOutput,
} from 'models';
import {
  ApiResponse,
  ServiceInquiryCategoryResponse,
  ServiceInquiryDetailSubCategoryResponse,
  ServiceInquiryNewServiceResponse,
  ServiceInquiryOrdersResponse,
  ServiceInquiryOwnedServiceDetailResponse,
  ServiceInquiryOwnedServiceResponse,
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

  inquiryOwnedService: async (): Promise<ServiceInquiryOwnedServiceOutput> => {
    const response = await axiosInstance.get<ApiResponse<ServiceInquiryOwnedServiceResponse>>(
      `/service/owned`,
    );

    return transformToServiceInquiryOwnedServiceOutput(response.data.output_schema);
  },

  inquiryOwnedServiceDetail: async (
    serviceId: string,
  ): Promise<ServiceInquiryOwnedServiceDetailOutput> => {
    const response = await axiosInstance.get<ApiResponse<ServiceInquiryOwnedServiceDetailResponse>>(
      `/service/owned/${serviceId}`,
    );

    return transformToServiceInquiryOwnedServiceDetailOutput(response.data.output_schema);
  },

  inquiryOrders: async (serviceId: string): Promise<ServiceInquiryOrdersOutput> => {
    const response = await axiosInstance.get<ApiResponse<ServiceInquiryOrdersResponse>>(
      `/service/owned/${serviceId}/orders`,
    );

    return transformToServiceInquiryOrdersOutput(response.data.output_schema);
  },

  deactivate: async (serviceId: string): Promise<{}> => {
    const response = await axiosInstance.put<ApiResponse<{}>>(
      `/service/owned/${serviceId}/deactivate`,
    );

    return response.data.output_schema;
  },

  delete: async (serviceId: string): Promise<{}> => {
    const response = await axiosInstance.put<ApiResponse<{}>>(`/service/owned/${serviceId}/delete`);

    return response.data.output_schema;
  },
};

export default ServiceService;
