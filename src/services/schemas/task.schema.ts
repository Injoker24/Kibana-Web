import { TaskCreateTaskInput, TaskGenerateTokenInput, TaskInquiryTaskListInput } from 'models';

export interface TaskInquiryCategoryResponse {
  categories: {
    id: string;
    name: string;
    image_url: string;
    task_amount: number;
    sub_categories: {
      id: string;
      name: string;
    }[];
  }[];
}

export interface TaskInquiryNewTaskResponse {
  tasks: {
    id: string;
    name: string;
    description: string;
    tags: string[];
    due_date: string;
    difficulty: string;
    price: number;
  }[];
}

export interface TaskInquiryDetailSubCategoryResponse {
  sub_categories: {
    id: string;
    name: string;
    desc: string;
    image_url: string;
  }[];
}

export interface TaskInquiryTaskListRequest {
  search_text?: string;
  sub_category?: string[];
  budget?: {
    budget_start: number;
    budget_end?: number;
  }[];
  difficulty?: string[];
  last_id?: string;
}

export function transformToTaskInquiryTaskListRequest(
  input: TaskInquiryTaskListInput,
): TaskInquiryTaskListRequest {
  const result: TaskInquiryTaskListRequest = {
    search_text: input.searchText,
    sub_category: input.subCategory,
    budget: input.budget?.map((t) => {
      return {
        budget_start: t.budgetStart,
        budget_end: t.budgetEnd,
      };
    }),
    difficulty: input.difficulty,
    last_id: input.lastId,
  };

  return result;
}

export interface TaskInquiryTaskListResponse {
  tasks: {
    id: string;
    name: string;
    description: string;
    tags: string[];
    due_date: string;
    difficulty: string;
    price: number;
  }[];
  total_amount: number;
  has_next_page: boolean;
  last_id: string;
}

export interface TaskInquiryTaskDetailResponse {
  task_detail: {
    id: string;
    name: string;
    tags: string[];
    due_date: string;
    difficulty: string;
    price: number;
    description: string;
  };
  client: {
    id: string;
    profile_image_url: string;
    name: string;
  };
  registered_freelancer?: {
    id: string;
    profile_image_url: string;
    name: string;
  }[];
  review: {
    average_rating: number;
    rating_amount: number;
    review_list?: {
      name: string;
      star: number;
      description: string;
      timestamp: string;
    }[];
  };
}

export interface TaskInquiryOwnedTaskResponse {
  tasks?: {
    id: string;
    name: string;
    tags: string[];
    due_date: string;
    price: number;
    status: string;
    delivery_date?: string;
    registered_freelancer_amount?: number;
    chosen_freelancer?: {
      id: string;
      name: string;
      profile_image_url?: string;
    };
    transaction_id?: string;
    is_reviewed?: boolean;
    review?: {
      amount: number;
    };
  }[];
}

export interface TaskInquiryTaskHistoryResponse {
  tasks?: {
    id: string;
    name: string;
    tags: string[];
    due_date: string;
    price: number;
    status: string;
    delivery_date?: string;
    registered_freelancer_amount?: number;
    client?: {
      id: string;
      name: string;
      profile_image_url?: string;
    };
    transaction_id?: string;
    is_reviewed?: boolean;
    review?: {
      amount: number;
    };
  }[];
}

export interface TaskInquiryOwnedTaskDetailResponse {
  task_detail: {
    id: string;
    name: string;
    tags: string[];
    due_date: string;
    price: number;
    status: string;
    difficulty: string;
  };
}

export interface TaskInquiryRegisteredFreelancerListResponse {
  choose_due_date?: string;
  registered_freelancer?: {
    id: string;
    name: string;
    profile_image_url?: string;
    description: string;
    portfolio_url?: string;
    cv_url?: string;
  }[];
}

export interface TaskInquiryTaskHistoryDetailResponse {
  task_detail: {
    id: string;
    name: string;
    tags: string[];
    due_date: string;
    difficulty: string;
    price: number;
    status: string;
  };
}

export interface TaskCreateTaskRequest {
  name: string;
  sub_category: string;
  deadline: string;
  difficulty: string;
  description: string;
  price: number;
  tags: string[];
}

export function transformToTaskCreateTaskRequest(
  input: TaskCreateTaskInput,
): TaskCreateTaskRequest {
  const result: TaskCreateTaskRequest = {
    name: input.name,
    sub_category: input.subCategory,
    deadline: input.deadline,
    difficulty: input.difficulty,
    description: input.description,
    price: input.price,
    tags: input.tags,
  };

  return result;
}

export interface TaskCreateTaskResponse {
  id: string;
}

export interface TaskGenerateTokenRequest {
  freelancer_id: string;
}

export function transformToTaskGenerateTokenRequest(
  input: TaskGenerateTokenInput,
): TaskGenerateTokenRequest {
  const result: TaskGenerateTokenRequest = {
    freelancer_id: input.freelancerId,
  };

  return result;
}

export interface TaskGenerateTokenResponse {
  token: string;
  payment_id: string;
}
