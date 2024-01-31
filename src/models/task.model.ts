import {
  TaskInquiryCategoryResponse,
  TaskInquiryDetailSubCategoryResponse,
  TaskInquiryNewTaskResponse,
  TaskInquiryTaskListResponse,
} from 'services/schemas';
import { formatCurrency } from 'utils';

export interface TaskInquiryCategoryOutput {
  categories: {
    id: string;
    name: string;
    imageUrl: string;
    taskAmount: Number;
    subCategories: {
      id: string;
      name: string;
    }[];
  }[];
}

export function transformToTaskInquiryCategoryOutput(
  response: TaskInquiryCategoryResponse,
): TaskInquiryCategoryOutput {
  const result: TaskInquiryCategoryOutput = {
    categories: response.categories.map((t) => {
      return {
        id: t.id,
        name: t.name,
        imageUrl: t.image_url,
        taskAmount: t.task_amount,
        subCategories: t.sub_categories.map((m) => {
          return {
            id: m.id,
            name: m.name,
          };
        }),
      };
    }),
  };

  return result;
}

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

export interface TaskInquiryDetailSubCategoryOutput {
  subCategories: {
    id: string;
    name: string;
    desc: string;
    imageUrl: string;
  }[];
}

export function transformToTaskInquiryDetailSubCategoryOutput(
  response: TaskInquiryDetailSubCategoryResponse,
): TaskInquiryDetailSubCategoryOutput {
  const result: TaskInquiryDetailSubCategoryOutput = {
    subCategories: response.sub_categories.map((t) => {
      return {
        id: t.id,
        name: t.name,
        desc: t.desc,
        imageUrl: t.image_url,
      };
    }),
  };

  return result;
}

export interface TaskInquiryTaskListInput {
  searchText?: string;
  subCategory?: string[];
  budget?: {
    budgetStart: number;
    budgetEnd?: number;
  }[];
  difficulty?: string[];
  lastId?: string;
}

export interface TaskInquiryTaskListOutput {
  tasks: {
    id: string;
    name: string;
    description: string;
    tags: string[];
    dueDate: string;
    difficulty: string;
    price: string;
  }[];
  totalAmount: number;
  hasNextPage: boolean;
  lastId: string;
}

export function transformToTaskInquiryTaskListOutput(
  response: TaskInquiryTaskListResponse,
): TaskInquiryTaskListOutput {
  const result: TaskInquiryTaskListOutput = {
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
    totalAmount: response.total_amount,
    hasNextPage: response.has_next_page,
    lastId: response.last_id,
  };

  return result;
}
