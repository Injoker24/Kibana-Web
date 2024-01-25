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
