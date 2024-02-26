import {
  ServiceInquiryCategoryResponse,
  ServiceInquiryDetailSubCategoryResponse,
  ServiceInquiryNewServiceResponse,
  ServiceInquiryServiceDetailResponse,
  ServiceInquiryServiceHistoryResponse,
  ServiceInquiryServiceListResponse,
} from 'services/schemas/service.schema';
import { formatCurrency } from 'utils';

export interface ServiceInquiryCategoryOutput {
  categories: {
    id: string;
    name: string;
    imageUrl: string;
    serviceAmount: number;
    subCategories: {
      id: string;
      name: string;
    }[];
  }[];
}

export function transformToServiceInquiryCategoryOutput(
  response: ServiceInquiryCategoryResponse,
): ServiceInquiryCategoryOutput {
  const result: ServiceInquiryCategoryOutput = {
    categories: response.categories.map((t) => {
      return {
        id: t.id,
        name: t.name,
        imageUrl: t.image_url,
        serviceAmount: t.service_amount,
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

export interface ServiceInquiryNewServiceOutput {
  services: {
    id: string;
    imageUrl: string;
    name: string;
    freelancer: {
      profileImageUrl?: string;
      name: string;
    };
    averageRating: number;
    ratingAmount: number;
    tags: string[];
    price: string;
    workingTime: number;
  }[];
}

export function transformToServiceInquiryNewServiceOutput(
  response: ServiceInquiryNewServiceResponse,
): ServiceInquiryNewServiceOutput {
  const result: ServiceInquiryNewServiceOutput = {
    services: response.services.map((t) => {
      return {
        id: t.id,
        imageUrl: t.image_url,
        name: t.name,
        freelancer: {
          profileImageUrl: t.freelancer.profile_image_url,
          name: t.freelancer.name,
        },
        averageRating: t.average_rating,
        ratingAmount: t.rating_amount,
        tags: t.tags,
        price: formatCurrency(t.price),
        workingTime: t.working_time,
      };
    }),
  };

  return result;
}

export interface ServiceInquiryDetailSubCategoryOutput {
  subCategories: {
    id: string;
    name: string;
    desc: string;
    imageUrl: string;
  }[];
}

export function transformToServiceInquiryDetailSubCategoryOutput(
  response: ServiceInquiryDetailSubCategoryResponse,
): ServiceInquiryDetailSubCategoryOutput {
  const result: ServiceInquiryDetailSubCategoryOutput = {
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

export interface ServiceInquiryServiceListInput {
  searchText?: string;
  subCategory?: string[];
  budget?: {
    budgetStart: number;
    budgetEnd?: number;
  }[];
  workingTime?: {
    workingTimeStart: number;
    workingTimeEnd?: number;
  }[];
  lastId?: string;
}

export interface ServiceInquiryServiceListOutput {
  services: {
    id: string;
    imageUrl: string;
    name: string;
    freelancer: {
      profileImageUrl?: string;
      name: string;
    };
    averageRating: number;
    ratingAmount: number;
    tags: string[];
    price: string;
    workingTime: number;
  }[];
  totalAmount: number;
  hasNextPage: boolean;
  lastId: string;
}

export function transformToServiceInquiryServiceListOutput(
  response: ServiceInquiryServiceListResponse,
): ServiceInquiryServiceListOutput {
  const result: ServiceInquiryServiceListOutput = {
    services: response.services.map((t) => {
      return {
        id: t.id,
        imageUrl: t.image_url,
        name: t.name,
        freelancer: {
          profileImageUrl: t.freelancer.profile_image_url,
          name: t.freelancer.name,
        },
        averageRating: t.average_rating,
        ratingAmount: t.rating_amount,
        tags: t.tags,
        price: formatCurrency(t.price),
        workingTime: t.working_time,
      };
    }),
    totalAmount: response.total_amount,
    hasNextPage: response.has_next_page,
    lastId: response.last_id,
  };

  return result;
}

export interface ServiceInquiryServiceDetailOutput {
  serviceDetail: {
    id: string;
    imageUrl: string[];
    name: string;
    tags: string[];
    workingTime: number;
    price: string;
    revisionCount: number;
    additionalInfo: {
      title: string;
      isSupported: boolean;
    }[];
    description: string;
  };
  freelancer: {
    id: string;
    profileImageUrl?: string;
    name: string;
    description: string;
  };
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

export function transformToServiceInquiryServiceDetailOutput(
  response: ServiceInquiryServiceDetailResponse,
): ServiceInquiryServiceDetailOutput {
  const result: ServiceInquiryServiceDetailOutput = {
    serviceDetail: {
      id: response.service_detail.id,
      imageUrl: response.service_detail.image_url,
      name: response.service_detail.name,
      tags: response.service_detail.tags,
      workingTime: response.service_detail.working_time,
      price: formatCurrency(response.service_detail.price),
      revisionCount: response.service_detail.revision_count,
      additionalInfo: response.service_detail.additional_info.map((t) => {
        return {
          title: t.title,
          isSupported: t.is_supported,
        };
      }),
      description: response.service_detail.description,
    },
    freelancer: {
      id: response.freelancer.id,
      profileImageUrl: response.freelancer.profile_image_url,
      name: response.freelancer.name,
      description: response.freelancer.description,
    },
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

export interface ServiceInquiryServiceHistoryOutput {
  services?: {
    id: string;
    name: string;
    tags: string[];
    dueDate: string;
    price: number;
    status: string;
    deliveryDate?: string;
    freelancer: {
      id: string;
      name: string;
      profileImageUrl?: string;
    };
    averageRating: number;
    ratingAmount: number;
    transactionId: string;
    isReviewed?: boolean;
    review?: {
      amount: number;
    };
  }[];
}

export function transformToServiceInquiryServiceHistoryOutput(
  response: ServiceInquiryServiceHistoryResponse,
): ServiceInquiryServiceHistoryOutput {
  const result: ServiceInquiryServiceHistoryOutput = {
    services: response.services?.map((t) => {
      return {
        id: t.id,
        name: t.name,
        tags: t.tags,
        dueDate: t.due_date,
        price: t.price,
        status: t.status,
        deliveryDate: t.delivery_date,
        freelancer: {
          id: t.freelancer.id,
          name: t.freelancer.name,
          profileImageUrl: t.freelancer.profile_image_url,
        },
        averageRating: t.average_rating,
        ratingAmount: t.rating_amount,
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
