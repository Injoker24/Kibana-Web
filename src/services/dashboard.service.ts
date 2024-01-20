import {
  DashboardInquiryServiceListOutput,
  transformToDashboardInquiryServiceListOutput,
} from 'models';

import { ApiResponse, DashboardInquiryServiceListResponse } from 'services/schemas';

import { axiosInstance } from 'setup';

const DashboardService = {
  inquiryServiceList: async (): Promise<DashboardInquiryServiceListOutput> => {
    const response = await axiosInstance.get<ApiResponse<DashboardInquiryServiceListResponse>>(
      `/service/category`,
    );

    return transformToDashboardInquiryServiceListOutput(response.data.output_schema);
  },
};

export default DashboardService;
