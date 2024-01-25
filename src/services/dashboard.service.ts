import {
  DashboardInquiryNewServiceOutput,
  DashboardInquiryNewTaskOutput,
  transformToDashboardInquiryNewServiceOutput,
  transformToDashboardInquiryNewTaskOutput,
} from 'models';

import {
  ApiResponse,
  DashboardInquiryNewServiceResponse,
  DashboardInquiryNewTaskResponse,
} from 'services/schemas';

import { axiosInstance } from 'setup';

const DashboardService = {
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
