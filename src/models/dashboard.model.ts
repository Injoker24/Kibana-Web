import {
  DashboardInquiryNewServiceResponse,
  DashboardInquiryNewTaskResponse,
} from 'services/schemas';
import { formatCurrency } from 'utils';

export interface DashboardInquiryNewTaskOutput {
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

export function transformToDashboardInquiryNewTaskOutput(
  response: DashboardInquiryNewTaskResponse,
): DashboardInquiryNewTaskOutput {
  const result: DashboardInquiryNewTaskOutput = {
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

export interface DashboardInquiryNewServiceOutput {
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

export function transformToDashboardInquiryNewServiceOutput(
  response: DashboardInquiryNewServiceResponse,
): DashboardInquiryNewServiceOutput {
  const result: DashboardInquiryNewServiceOutput = {
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
