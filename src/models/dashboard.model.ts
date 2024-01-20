import { DashboardInquiryServiceListResponse } from 'services/schemas';

export interface DashboardInquiryServiceListOutput {
  categories: {
    id: string;
    name: string;
    serviceAmount: number;
    imageUrl: string;
  }[];
}

export function transformToDashboardInquiryServiceListOutput(
  response: DashboardInquiryServiceListResponse,
): DashboardInquiryServiceListOutput {
  const result: DashboardInquiryServiceListOutput = {
    categories: response.categories.map((t) => {
      return {
        id: t.id,
        name: t.name,
        serviceAmount: t.service_amount,
        imageUrl: t.image_url,
      };
    }),
  };

  return result;
}
