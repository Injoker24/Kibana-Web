import {
  DashboardInquiryNewServiceOutput,
  DashboardInquiryNewTaskOutput,
  DashboardInquiryServiceCategoryListOutput,
  transformToDashboardInquiryNewServiceOutput,
  transformToDashboardInquiryNewTaskOutput,
  transformToDashboardInquiryServiceCategoryListOutput,
} from 'models';

import {
  ApiResponse,
  DashboardInquiryNewServiceResponse,
  DashboardInquiryNewTaskResponse,
  DashboardInquiryServiceCategoryListResponse,
} from 'services/schemas';

import { axiosInstance } from 'setup';

const DashboardService = {
  inquiryServiceCategoryList: async (): Promise<DashboardInquiryServiceCategoryListOutput> => {
    const response = await axiosInstance.get<
      ApiResponse<DashboardInquiryServiceCategoryListResponse>
    >(`/service/category`);

    return transformToDashboardInquiryServiceCategoryListOutput(response.data.output_schema);
  },

  inquiryNewTask: async (): Promise<DashboardInquiryNewTaskOutput> => {
    const response = await axiosInstance.get<ApiResponse<DashboardInquiryNewTaskResponse>>(
      `/task/new`,
    );

    return transformToDashboardInquiryNewTaskOutput(response.data.output_schema);
  },

  inquiryNewService: async (): Promise<DashboardInquiryNewServiceOutput> => {
    const response = await axiosInstance.get<ApiResponse<DashboardInquiryNewServiceResponse>>(
      `/service/new`,
    );

    return transformToDashboardInquiryNewServiceOutput(response.data.output_schema);
  },
};

export default DashboardService;
