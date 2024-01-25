import { TaskInquiryNewTaskResponse } from 'services/schemas';
import { formatCurrency } from 'utils';

export interface TaskInquiryNewTaskOutput {
  tasks: {
    id: string;
    name: string;
    description: string;
    tags: string[];
    dueDate: string;
    difficulty: string;
    price: string;
  }[];
}

export function transformToTaskInquiryNewTaskOutput(
  response: TaskInquiryNewTaskResponse,
): TaskInquiryNewTaskOutput {
  const result: TaskInquiryNewTaskOutput = {
    tasks: response.tasks.map((t) => {
      return {
        id: t.id,
        name: t.name,
        description: t.description,
        tags: t.tags,
        dueDate: t.due_date,
        difficulty: t.difficulty,
        price: formatCurrency(t.price),
      };
    }),
  };

  return result;
}
