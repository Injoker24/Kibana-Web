import {
  TaskCreateTaskInput,
  TaskCreateTaskOutput,
  TaskInquiryCategoryOutput,
  TaskInquiryDetailSubCategoryOutput,
  TaskInquiryNewTaskOutput,
  TaskInquiryOwnedTaskDetailOutput,
  TaskInquiryOwnedTaskOutput,
  TaskInquiryRegisteredFreelancerListOutput,
  TaskInquiryTaskDetailOutput,
  TaskInquiryTaskHistoryDetailOutput,
  TaskInquiryTaskHistoryOutput,
  TaskInquiryTaskListInput,
  TaskInquiryTaskListOutput,
  transformToTaskCreateTaskOutput,
  transformToTaskInquiryCategoryOutput,
  transformToTaskInquiryDetailSubCategoryOutput,
  transformToTaskInquiryNewTaskOutput,
  transformToTaskInquiryOwnedTaskDetailOutput,
  transformToTaskInquiryOwnedTaskOutput,
  transformToTaskInquiryRegisteredFreelancerListOutput,
  transformToTaskInquiryTaskDetailOutput,
  transformToTaskInquiryTaskHistoryDetailOutput,
  transformToTaskInquiryTaskHistoryOutput,
  transformToTaskInquiryTaskListOutput,
} from 'models';

import {
  ApiResponse,
  TaskCreateTaskResponse,
  TaskInquiryCategoryResponse,
  TaskInquiryDetailSubCategoryResponse,
  TaskInquiryNewTaskResponse,
  TaskInquiryOwnedTaskDetailResponse,
  TaskInquiryOwnedTaskResponse,
  TaskInquiryRegisteredFreelancerListResponse,
  TaskInquiryTaskDetailResponse,
  TaskInquiryTaskHistoryDetailResponse,
  TaskInquiryTaskHistoryResponse,
  TaskInquiryTaskListResponse,
  transformToTaskCreateTaskRequest,
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

  inquiryTaskHistory: async (): Promise<TaskInquiryTaskHistoryOutput> => {
    const response = await axiosInstance.get<ApiResponse<TaskInquiryTaskHistoryResponse>>(
      `/task/history`,
    );

    return transformToTaskInquiryTaskHistoryOutput(response.data.output_schema);
  },

  inquiryOwnedTaskDetail: async (taskId: string): Promise<TaskInquiryOwnedTaskDetailOutput> => {
    const response = await axiosInstance.get<ApiResponse<TaskInquiryOwnedTaskDetailResponse>>(
      `/task/owned/${taskId}`,
    );

    return transformToTaskInquiryOwnedTaskDetailOutput(response.data.output_schema);
  },

  inquiryRegisteredFreelancerList: async (
    taskId: string,
  ): Promise<TaskInquiryRegisteredFreelancerListOutput> => {
    const response = await axiosInstance.get<
      ApiResponse<TaskInquiryRegisteredFreelancerListResponse>
    >(`/task/${taskId}/freelancer-list`);

    return transformToTaskInquiryRegisteredFreelancerListOutput(response.data.output_schema);
  },

  deleteTask: async (taskId: string): Promise<{}> => {
    const response = await axiosInstance.put<ApiResponse<{}>>(`/task/${taskId}/delete`);

    return response.data.output_schema;
  },

  inquiryTaskHistoryDetail: async (taskId: string): Promise<TaskInquiryTaskHistoryDetailOutput> => {
    const response = await axiosInstance.get<ApiResponse<TaskInquiryTaskHistoryDetailResponse>>(
      `/task/history/${taskId}`,
    );

    return transformToTaskInquiryTaskHistoryDetailOutput(response.data.output_schema);
  },

  create: async (data: TaskCreateTaskInput): Promise<TaskCreateTaskOutput> => {
    const requestData = transformToTaskCreateTaskRequest(data);

    const response = await axiosInstance.post<ApiResponse<TaskCreateTaskResponse>>(
      `/task/create`,
      requestData,
    );

    return transformToTaskCreateTaskOutput(response.data.output_schema);
  },
};

export default TaskService;
