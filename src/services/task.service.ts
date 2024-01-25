import { TaskInquiryNewTaskOutput, transformToTaskInquiryNewTaskOutput } from 'models';

import { ApiResponse, TaskInquiryNewTaskResponse } from 'services/schemas';

import { axiosInstance } from 'setup';

const TaskService = {
  inquiryNewTask: async (): Promise<TaskInquiryNewTaskOutput> => {
    const response = await axiosInstance.get<ApiResponse<TaskInquiryNewTaskResponse>>(`/task/new`);

    return transformToTaskInquiryNewTaskOutput(response.data.output_schema);
  },
};

export default TaskService;
