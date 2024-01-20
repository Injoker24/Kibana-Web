export interface ApiResponse<T> {
  output_schema: T;
  error_schema: {
    error_code: string;
    error_message: string;
  };
}
