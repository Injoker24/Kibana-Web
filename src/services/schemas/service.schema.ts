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
