import { ServiceCreateServiceInput, ServiceInquiryServiceListInput } from 'models';

export interface ServiceInquiryCategoryResponse {
  categories: {
    id: string;
    name: string;
    image_url: string;
    service_amount: number;
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
      profile_image_url?: string;
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

export interface ServiceInquiryServiceDetailResponse {
  service_detail: {
    id: string;
    image_url: string[];
    name: string;
    tags: string[];
    working_time: number;
    price: number;
    revision_count: number;
    additional_info: {
      title: string;
      is_supported: boolean;
    }[];
    description: string;
  };
  freelancer: {
    id: string;
    profile_image_url: string;
    name: string;
    description: string;
  };
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

export interface ServiceInquiryServiceHistoryResponse {
  services?: {
    id: string;
    name: string;
    tags: string[];
    due_date: string;
    price: number;
    status: string;
    delivery_date?: string;
    freelancer: {
      id: string;
      name: string;
      profile_image_url?: string;
    };
    average_rating: number;
    rating_amount: number;
    transaction_id: string;
    is_reviewed?: boolean;
    review?: {
      amount: number;
    };
  }[];
}

export interface ServiceInquiryOwnedServiceResponse {
  services?: {
    id: string;
    name: string;
    working_time: number;
    tags: string[];
    image_url: string;
    price: number;
    average_rating: number;
    rating_amount: number;
    in_progress_transaction_amount: number;
    is_active: boolean;
  }[];
}

export interface ServiceInquiryOwnedServiceDetailResponse {
  service_detail: {
    id: string;
    name: string;
    working_time: number;
    tags: string[];
    price: number;
    is_active: boolean;
  };
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

export interface ServiceInquiryOrdersResponse {
  transactions?: {
    id: string;
    status: string;
    due_date: string;
    delivery_date?: string;
    client: {
      id: string;
      name: string;
      profile_image_url?: string;
    };
    is_reviewed?: boolean;
    review?: {
      amount: number;
    };
  }[];
}

export interface ServiceCreateServiceRequest {
  image: File[];
  name: string;
  sub_category: string;
  working_time: number;
  revision_count: number;
  description: string;
  price: number;
  tags: string[];
  additional_info: {
    id: string;
    is_supported: boolean;
  }[];
}

export function transformToServiceCreateServiceRequest(
  input: ServiceCreateServiceInput,
): ServiceCreateServiceRequest {
  const result: ServiceCreateServiceRequest = {
    image: input.image,
    name: input.name,
    sub_category: input.subCategory,
    working_time: input.workingTime,
    revision_count: input.revisionCount,
    description: input.description,
    price: input.price,
    tags: input.tags,
    additional_info: input.additionalInfo.map((t) => {
      return {
        id: t.id,
        is_supported: t.isSupported,
      };
    }),
  };

  return result;
}

export interface ServiceCreateServiceResponse {
  id: string;
}

export interface ServiceInquiryAdditionalInfoResponse {
  additional_info: {
    id: string;
    title: string;
  }[];
}

export interface ServiceGenerateTokenResponse {
  token: string;
  payment_id: string;
}
