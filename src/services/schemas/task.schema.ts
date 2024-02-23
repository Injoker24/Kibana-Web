import { TaskInquiryTaskListInput } from 'models';

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
