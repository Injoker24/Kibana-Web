import {
  TaskCreateTaskResponse,
  TaskGenerateTokenResponse,
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
} from 'services/schemas';
import { formatCurrency } from 'utils';

export interface TaskInquiryCategoryOutput {
  categories: {
    id: string;
    name: string;
    imageUrl: string;
    taskAmount: number;
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
    price: string;
    description: string;
  };
  client: {
    id: string;
    profileImageUrl?: string;
    name: string;
  };
  registeredFreelancer?: {
    id: string;
    profileImageUrl?: string;
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
      price: formatCurrency(response.task_detail.price),
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

export interface TaskInquiryOwnedTaskOutput {
  tasks?: {
    id: string;
    name: string;
    tags: string[];
    dueDate: string;
    price: number;
    status: string;
    deliveryDate?: string;
    registeredFreelancerAmount?: number;
    chosenFreelancer?: {
      id: string;
      name: string;
      profileImageUrl?: string;
    };
    transactionId?: string;
    isReviewed?: boolean;
    review?: {
      amount: number;
    };
  }[];
}

export function transformToTaskInquiryOwnedTaskOutput(
  response: TaskInquiryOwnedTaskResponse,
): TaskInquiryOwnedTaskOutput {
  const result: TaskInquiryOwnedTaskOutput = {
    tasks: response.tasks?.map((t) => {
      return {
        id: t.id,
        name: t.name,
        tags: t.tags,
        dueDate: t.due_date,
        price: t.price,
        status: t.status,
        deliveryDate: t.delivery_date,
        registeredFreelancerAmount: t.registered_freelancer_amount,
        chosenFreelancer: t.chosen_freelancer
          ? {
              id: t.chosen_freelancer.id,
              name: t.chosen_freelancer.name,
              profileImageUrl: t.chosen_freelancer.profile_image_url,
            }
          : undefined,
        transactionId: t.transaction_id,
        isReviewed: t.is_reviewed,
        review: t.review
          ? {
              amount: t.review?.amount,
            }
          : undefined,
      };
    }),
  };

  return result;
}

export interface TaskInquiryTaskHistoryOutput {
  tasks?: {
    id: string;
    name: string;
    tags: string[];
    dueDate: string;
    price: number;
    status: string;
    deliveryDate?: string;
    registeredFreelancerAmount?: number;
    client?: {
      id: string;
      name: string;
      profileImageUrl?: string;
    };
    transactionId?: string;
    isReviewed?: boolean;
    review?: {
      amount: number;
    };
  }[];
}

export function transformToTaskInquiryTaskHistoryOutput(
  response: TaskInquiryTaskHistoryResponse,
): TaskInquiryTaskHistoryOutput {
  const result: TaskInquiryTaskHistoryOutput = {
    tasks: response.tasks?.map((t) => {
      return {
        id: t.id,
        name: t.name,
        tags: t.tags,
        dueDate: t.due_date,
        price: t.price,
        status: t.status,
        deliveryDate: t.delivery_date,
        registeredFreelancerAmount: t.registered_freelancer_amount,
        client: t.client
          ? {
              id: t.client.id,
              name: t.client.name,
              profileImageUrl: t.client.profile_image_url,
            }
          : undefined,
        transactionId: t.transaction_id,
        isReviewed: t.is_reviewed,
        review: t.review
          ? {
              amount: t.review?.amount,
            }
          : undefined,
      };
    }),
  };

  return result;
}

export interface TaskInquiryOwnedTaskDetailOutput {
  taskDetail: {
    id: string;
    name: string;
    tags: string[];
    dueDate: string;
    price: number;
    status: string;
    difficulty: string;
  };
}

export function transformToTaskInquiryOwnedTaskDetailOutput(
  response: TaskInquiryOwnedTaskDetailResponse,
): TaskInquiryOwnedTaskDetailOutput {
  const result: TaskInquiryOwnedTaskDetailOutput = {
    taskDetail: {
      id: response.task_detail.id,
      name: response.task_detail.name,
      tags: response.task_detail.tags,
      dueDate: response.task_detail.due_date,
      price: response.task_detail.price,
      status: response.task_detail.status,
      difficulty: response.task_detail.difficulty,
    },
  };

  return result;
}

export interface TaskInquiryRegisteredFreelancerListOutput {
  chooseDueDate?: string;
  registeredFreelancer?: {
    id: string;
    name: string;
    profileImageUrl?: string;
    description: string;
    portfolioUrl?: string;
    cvUrl?: string;
  }[];
}

export function transformToTaskInquiryRegisteredFreelancerListOutput(
  response: TaskInquiryRegisteredFreelancerListResponse,
): TaskInquiryRegisteredFreelancerListOutput {
  const result: TaskInquiryRegisteredFreelancerListOutput = {
    chooseDueDate: response.choose_due_date,
    registeredFreelancer: response.registered_freelancer?.map((t) => {
      return {
        id: t.id,
        name: t.name,
        profileImageUrl: t.profile_image_url,
        description: t.description,
        portfolioUrl: t.portfolio_url,
        cvUrl: t.cv_url,
      };
    }),
  };

  return result;
}

export interface TaskInquiryTaskHistoryDetailOutput {
  taskDetail: {
    id: string;
    name: string;
    tags: string[];
    dueDate: string;
    difficulty: string;
    price: number;
    status: string;
  };
}

export function transformToTaskInquiryTaskHistoryDetailOutput(
  response: TaskInquiryTaskHistoryDetailResponse,
): TaskInquiryTaskHistoryDetailOutput {
  const result: TaskInquiryTaskHistoryDetailOutput = {
    taskDetail: {
      id: response.task_detail.id,
      name: response.task_detail.name,
      tags: response.task_detail.tags,
      dueDate: response.task_detail.due_date,
      difficulty: response.task_detail.difficulty,
      price: response.task_detail.price,
      status: response.task_detail.status,
    },
  };

  return result;
}

export interface TaskCreateTaskInput {
  name: string;
  subCategory: string;
  deadline: string;
  difficulty: string;
  description: string;
  price: number;
  tags: string[];
}

export interface TaskCreateTaskOutput {
  id: string;
}

export function transformToTaskCreateTaskOutput(
  response: TaskCreateTaskResponse,
): TaskCreateTaskOutput {
  const result: TaskCreateTaskOutput = {
    id: response.id,
  };

  return result;
}

export interface TaskGenerateTokenInput {
  freelancerId: string;
}

export interface TaskGenerateTokenOutput {
  token: string;
  paymentId: string;
}

export function transformToTaskGenerateTokenOutput(
  response: TaskGenerateTokenResponse,
): TaskGenerateTokenOutput {
  const result: TaskGenerateTokenOutput = {
    token: response.token,
    paymentId: response.payment_id,
  };

  return result;
}
