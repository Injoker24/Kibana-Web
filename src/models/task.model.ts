import {
  TaskInquiryCategoryResponse,
  TaskInquiryDetailSubCategoryResponse,
  TaskInquiryNewTaskResponse,
  TaskInquiryTaskDetailResponse,
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

export interface TaskInquiryTaskDetailOutput {
  taskDetail: {
    id: string;
    name: string;
    tags: string[];
    dueDate: string;
    difficulty: string;
    price: number;
    description: string;
  };
  client: {
    id: string;
    profileImageUrl: string;
    name: string;
  };
  registeredFreelancer?: {
    id: string;
    profileImageUrl: string;
    name: string;
  }[];
  review: {
    averageRating: number;
    ratingAmount: number;
    reviewList?: {
      name: string;
      star: number;
      description: string;
      timestamp: string;
    }[];
  };
}

export function transformToTaskInquiryTaskDetailOutput(
  response: TaskInquiryTaskDetailResponse,
): TaskInquiryTaskDetailOutput {
  const result: TaskInquiryTaskDetailOutput = {
    taskDetail: {
      id: response.task_detail.id,
      name: response.task_detail.name,
      tags: response.task_detail.tags,
      dueDate: response.task_detail.due_date,
      difficulty: response.task_detail.difficulty,
      price: response.task_detail.price,
      description: response.task_detail.description,
    },
    client: {
      id: response.client.id,
      profileImageUrl: response.client.profile_image_url,
      name: response.client.name,
    },
    registeredFreelancer: response.registered_freelancer?.map((t) => {
      return {
        id: t.id,
        profileImageUrl: t.profile_image_url,
        name: t.name,
      };
    }),
    review: {
      averageRating: response.review.average_rating,
      ratingAmount: response.review.rating_amount,
      reviewList: response.review.review_list?.map((t) => {
        return {
          name: t.name,
          star: t.star,
          description: t.description,
          timestamp: t.timestamp,
        };
      }),
    },
  };

  return result;
}
