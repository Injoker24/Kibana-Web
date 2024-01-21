export interface DashboardInquiryServiceCategoryListResponse {
  categories: {
    id: string;
    name: string;
    service_amount: number;
    image_url: string;
  }[];
}

export interface DashboardInquiryNewTaskResponse {
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

export interface DashboardInquiryNewServiceResponse {
  services: {
    id: string;
    image_url: string;
    name: string;
    freelancer: {
      profile_image_url: string;
      name: string;
    };
    average_rating: number;
    rating_amount: number;
    tags: string[];
    price: number;
    working_time: number;
  }[];
}
