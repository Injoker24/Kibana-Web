import { ServiceInquiryServiceListInput } from 'models';

export interface ServiceInquiryCategoryResponse {
  categories: {
    id: string;
    name: string;
    image_url: string;
    service_amount: Number;
    sub_categories: {
      id: string;
      name: string;
    }[];
  }[];
}

export interface ServiceInquiryNewServiceResponse {
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

export interface ServiceInquiryDetailSubCategoryResponse {
  sub_categories: {
    id: string;
    name: string;
    desc: string;
    image_url: string;
  }[];
}

export interface ServiceInquiryServiceListRequest {
  search_text?: string;
  sub_category?: string[];
  budget?: {
    budget_start: number;
    budget_end?: number;
  }[];
  working_time?: {
    working_time_start: number;
    working_time_end?: number;
  }[];
  last_id?: string;
}

export function transformToServiceInquiryServiceListRequest(
  input: ServiceInquiryServiceListInput,
): ServiceInquiryServiceListRequest {
  const result: ServiceInquiryServiceListRequest = {
    search_text: input.searchText,
    sub_category: input.subCategory,
    budget: input.budget?.map((t) => {
      return {
        budget_start: t.budgetStart,
        budget_end: t.budgetEnd,
      };
    }),
    working_time: input.workingTime?.map((t) => {
      return {
        working_time_start: t.workingTimeStart,
        working_time_end: t.workingTimeEnd,
      };
    }),
    last_id: input.lastId,
  };

  return result;
}

export interface ServiceInquiryServiceListResponse {
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
    price: string;
    working_time: number;
  }[];
  total_amount: number;
  has_next_page: boolean;
  last_id: string;
}
