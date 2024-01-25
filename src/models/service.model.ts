import { ServiceInquiryCategoryResponse } from 'services/schemas/service.schema';

export interface ServiceInquiryCategoryOutput {
  categories: {
    id: string;
    name: string;
    imageUrl: string;
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
