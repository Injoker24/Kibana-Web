export enum NonFatalErrorCodeV2 {
  InternalServiceError = 'ECB-3-997',
  GeneralServiceError = 'ECB-3-300',
  ServiceTimeout = 'ECB-3-998',
  UnmappedError = 'ECB-3-999',
  GatewayTimeout = '901',
  GeneralError = '999',

  // Verify OTP
  InvalidOTP = 'ECB-3-304',
  InvalidDOB = 'ECB-2-304',
  ShouldResendOTP = 'ECB-2-308',

  // Create New User
  UnexpectedInternalServiceError = 'ECB-2-999',
  FailedToCloseAccount = 'ECB-2-309',

  // Existing User
  InvalidPIN = 'ECB-2-201',
}

export enum FatalErrorCodeV2 {
  InvalidData = 'ECB-2-100',
  TimeoutTransaction = 'ECB-2-900',
  InvalidJSON = 'ECB-2-111',
  UnauthorizedChannel = 'ECB-2-901',
  NotFound = 'ECB-2-902',
  InvalidRequestID = 'ECB-3-301',

  // Inquiry Request ID
  InvalidPhoneNumber = 'ECB-2-301',

  // Generate OTP
  GenerateOTPLimitExceeded = 'ECB-3-302',

  // Verify OTP
  VerifyOTPLimitExceeded = 'ECB-3-303',
  AccountBlocked = 'ECB-2-302',
  RegistrationFailed = 'ECB-2-303',
  AccountBlocked2 = 'ECB-2-305',

  // Create New User
  AccountAlreadyActive = 'ECB-2-306',
  AccountMismatch = 'ECB-2-307',
  InvalidProductCode = 'ECB-2-314',

  // Existing User
  InvalidPIN3Times = 'ECB-2-204',
  MissingPINOffset = 'ECB-2-208',
  ClosedAccountStatus = 'ECB-2-310',
  BlockedAccountStatus = 'ECB-2-311',
  DataMismatch = 'ECB-2-312',
  AccountNotFound = 'ECB-2-313',
}
