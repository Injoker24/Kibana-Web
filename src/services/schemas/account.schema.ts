export interface AccountInquiryOtherProfileResponse {
  id: string;
  profile_image_url: string;
  name: string;
  username: string;
  is_freelancer: boolean;
}

export interface AccountInquiryOwnedTaskResponse {
  tasks: {
    id: string;
    name: string;
    description: string;
    tags: string[];
    due_date: string;
    difficulty: string;
    price: number;
  }[];
}

export interface AccountInquiryClientReviewResponse {
  average_rating: number;
  rating_amount: number;
  review_list?: {
    name: string;
    star: number;
    description: string;
    timestamp: string;
  }[];
}

export interface AccountInquiryDescriptionResponse {
  description: string;
}

export interface AccountInquiryEducationHistoryResponse {
  education_history?: {
    degree: string;
    major: string;
    university: string;
    country: string;
    graduation_year: string;
  }[];
}

export interface AccountInquirySkillResponse {
  skills?: string[];
}

export interface AccountInquiryCVUrlResponse {
  cv_url?: string;
}

export interface AccountInquiryPortfolioUrlResponse {
  portfolio_url?: string;
}

export interface AccountInquiryOwnedServiceResponse {
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
