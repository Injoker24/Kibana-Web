import {
  ServiceInquiryCategoryResponse,
  ServiceInquiryDetailSubCategoryResponse,
  ServiceInquiryNewServiceResponse,
} from 'services/schemas/service.schema';
import { formatCurrency } from 'utils';

export interface ServiceInquiryCategoryOutput {
  categories: {
    id: string;
    name: string;
    imageUrl: string;
    serviceAmount: Number;
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
      profileImageUrl: string;
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
