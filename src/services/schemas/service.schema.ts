export interface ServiceInquiryCategoryResponse {
  categories: {
    id: string;
    name: string;
    image_url: string;
    sub_categories: {
      id: string;
      name: string;
    }[];
  }[];
}
