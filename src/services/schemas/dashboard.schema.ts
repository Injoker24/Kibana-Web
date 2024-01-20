export interface DashboardInquiryServiceListResponse {
  categories: {
    id: string;
    name: string;
    service_amount: number;
    image_url: string;
  }[];
}
