export interface ApiResponse<T> {
    output_schema: T;
    error_schema: ErrorSchema;
}

export interface ErrorSchema {
    error_code: string;
    message: string;
    fatal_error_flag: boolean;
}