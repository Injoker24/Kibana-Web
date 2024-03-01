import {
  TaskInquiryCategoryOutput,
  TaskInquiryDetailSubCategoryOutput,
  TaskInquiryNewTaskOutput,
  TaskInquiryOwnedTaskOutput,
  TaskInquiryTaskDetailOutput,
  TaskInquiryTaskListInput,
  TaskInquiryTaskListOutput,
  transformToTaskInquiryCategoryOutput,
  transformToTaskInquiryDetailSubCategoryOutput,
  transformToTaskInquiryNewTaskOutput,
  transformToTaskInquiryOwnedTaskOutput,
  transformToTaskInquiryTaskDetailOutput,
  transformToTaskInquiryTaskListOutput,
} from 'models';

import {
  ApiResponse,
  TaskInquiryCategoryResponse,
  TaskInquiryDetailSubCategoryResponse,
  TaskInquiryNewTaskResponse,
  TaskInquiryOwnedTaskResponse,
  TaskInquiryTaskDetailResponse,
  TaskInquiryTaskListResponse,
  transformToTaskInquiryTaskListRequest,
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

  inquiryTaskList: async (input: TaskInquiryTaskListInput): Promise<TaskInquiryTaskListOutput> => {
    const request = transformToTaskInquiryTaskListRequest(input);
    const response = await axiosInstance.post<ApiResponse<TaskInquiryTaskListResponse>>(
      `/task/list`,
      request,
    );

    return transformToTaskInquiryTaskListOutput(response.data.output_schema);
  },

  inquiryTaskDetail: async (taskId: string): Promise<TaskInquiryTaskDetailOutput> => {
    const response = await axiosInstance.get<ApiResponse<TaskInquiryTaskDetailResponse>>(
      `/task/detail/${taskId}`,
    );

    return transformToTaskInquiryTaskDetailOutput(response.data.output_schema);
  },

  inquiryOwnedTask: async (): Promise<TaskInquiryOwnedTaskOutput> => {
    const response = await axiosInstance.get<ApiResponse<TaskInquiryOwnedTaskResponse>>(
      `/task/owned`,
    );

    return transformToTaskInquiryOwnedTaskOutput(response.data.output_schema);
  },
};

export default TaskService;
