import {
  TaskInquiryCategoryOutput,
  TaskInquiryDetailSubCategoryOutput,
  TaskInquiryNewTaskOutput,
  transformToTaskInquiryCategoryOutput,
  transformToTaskInquiryDetailSubCategoryOutput,
  transformToTaskInquiryNewTaskOutput,
} from 'models';

import {
  ApiResponse,
  TaskInquiryCategoryResponse,
  TaskInquiryDetailSubCategoryResponse,
  TaskInquiryNewTaskResponse,
} from 'services/schemas';

import { axiosInstance } from 'setup';

const TaskService = {
  inquiryCategory: async (): Promise<TaskInquiryCategoryOutput> => {
    const response = await axiosInstance.get<ApiResponse<TaskInquiryCategoryResponse>>(
      `/task/category`,
    );

    return transformToTaskInquiryCategoryOutput(response.data.output_schema);
  },

  inquiryNewTask: async (categoryId?: string): Promise<TaskInquiryNewTaskOutput> => {
    let path: string;
    if (categoryId) {
      path = `/task/new/${categoryId}`;
    } else {
      path = `/task/new`;
    }
    const response = await axiosInstance.get<ApiResponse<TaskInquiryNewTaskResponse>>(path);

    return transformToTaskInquiryNewTaskOutput(response.data.output_schema);
  },

  inquiryDetailSubCategory: async (
    categoryId: string,
  ): Promise<TaskInquiryDetailSubCategoryOutput> => {
    const response = await axiosInstance.get<ApiResponse<TaskInquiryDetailSubCategoryResponse>>(
      `/task/category/${categoryId}/detail`,
    );

    return transformToTaskInquiryDetailSubCategoryOutput(response.data.output_schema);
  },
};

export default TaskService;
