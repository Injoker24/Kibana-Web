export interface TaskInquiryCategoryResponse {
  categories: {
    id: string;
    name: string;
    image_url: string;
    task_amount: Number;
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
