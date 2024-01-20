export interface ErrorWrapperV2 {
  status: number;
  code: string;
  message: string;
  shouldExit: boolean;
}
