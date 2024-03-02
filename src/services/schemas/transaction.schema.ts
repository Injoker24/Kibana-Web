export interface TransactionInquiryDetailClientTaskResponse {
  transaction_detail: {
    id: string;
    task_detail: {
      id: string;
      name: string;
      tags: string[];
      due_date: string;
      difficulty: string;
      price: string;
    };
    status: string;
    delivery_date?: string;
    has_returned: boolean;
    chosen_freelancer: {
      id: string;
      name: string;
      profile_image_url?: string;
      description: string;
    };
    is_reviewed?: boolean;
    review?: {
      amount: number;
      description?: string;
    };
  };
}
