export interface ApiResponseV2<T> {
  output_schema: T;
  error_schema: {
    error_code: string;
    error_message: {
      english: string;
      indonesian: string;
    };
  };
}
